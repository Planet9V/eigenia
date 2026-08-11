import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, type, track, message, capacity } = body;

    const recipient = "jim@eigenia.nl";
    const timestamp = new Date().toISOString();

    console.log(`[CONTACT INTAKE ${timestamp}] Submission for ${recipient}:`, {
      name,
      email,
      company,
      type,
      track,
      capacity,
      message,
    });

    return NextResponse.json({
      success: true,
      recipient,
      timestamp,
      message: `Proposal submitted successfully to ${recipient}`,
    });
  } catch (error: any) {
    console.error("[CONTACT INTAKE ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}
