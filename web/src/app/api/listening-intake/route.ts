import { NextResponse } from "next/server";
import { sendListeningReturnEmail } from "@/lib/mailer";
import { validateListeningIntake, rateLimit } from "@/lib/listeningIntakeValidation";

/**
 * Cap the body before parsing it, same reason as /api/contact. Larger than that
 * route's cap because a return carries every free-text box a respondent wrote,
 * and a paste out of a mail client can carry a quote marker on every line.
 */
const MAX_BODY_BYTES = 256 * 1024;

/**
 * Best-effort caller identity. Railway sits behind a proxy, so the socket
 * address is the proxy; x-forwarded-for carries the client and its first entry
 * is the one the edge saw. It is spoofable, which is why the limit is a
 * courtesy control against floods and accidents rather than a security
 * boundary.
 */
function callerKey(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  try {
    const declared = Number(request.headers.get("content-length") ?? 0);
    if (declared > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "Request body too large" },
        { status: 413 }
      );
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "Request body too large" },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { success: false, error: "Body is not valid JSON" },
        { status: 400 }
      );
    }

    const result = validateListeningIntake(body);
    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: result.reason },
        { status: 400 }
      );
    }

    // Rate limit only what would otherwise send mail, so a malformed request
    // cannot burn a legitimate caller's allowance.
    const limit = rateLimit(callerKey(request));
    if (!limit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
      );
    }

    const recipient = "jim@eigenia.nl";
    const timestamp = new Date().toISOString();

    // A return whose shape was not recognised is still sent, unchanged. It is
    // the only copy of a judgement somebody spent half an hour making, and
    // dropping it to keep the inbox tidy would be the worst outcome available.
    await sendListeningReturnEmail(result.value);

    return NextResponse.json({
      success: true,
      recipient,
      timestamp,
      looksLikePackReturn: result.value.looksLikePackReturn,
      shapeNote: result.value.shapeNote,
      message: `Return delivered to ${recipient}`,
    });
  } catch (error: unknown) {
    console.error("[LISTENING INTAKE ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}
