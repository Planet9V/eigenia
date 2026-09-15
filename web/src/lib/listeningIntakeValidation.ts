/**
 * Validation and shape inspection for the MPN listening pack return path.
 *
 * /api/listening-intake takes an unauthenticated POST carrying one returned
 * pack file, either pasted into a textarea or read out of an uploaded .txt,
 * plus three small facts about the respondent. It follows the conventions of
 * contactValidation.ts: every field is checked for type and length before
 * anything is stringified into an email, and the per-caller rate limiter is
 * the one already defined there rather than a second copy of the same map.
 *
 * Two things this module deliberately does not do.
 *
 * It does not score, decode or check any answer. The key that decodes the item
 * labels lives with the study and is never on this website, so there is nothing
 * here that could tell a respondent whether an answer was right, and nothing
 * here that leaks what any item was.
 *
 * It does not reject a body for failing to look like a pack return. A return
 * that arrives malformed is still the only copy of a judgement somebody spent
 * half an hour making, and the intake protocol files every return whatever its
 * status. So the shape check reports, and the caller is told plainly what did
 * not look right, and the text is forwarded unchanged either way.
 */

import { EMAIL_PATTERN, rateLimit } from "./contactValidation";

export { rateLimit };

/**
 * Longest value accepted per field. returnText is generous because a full
 * return carries every free-text box, and a paste out of a mail client can
 * carry a quote marker on every line on top of that.
 */
export const LISTENING_LIMITS = {
  returnText: 200_000,
  role: 40,
  credit: 40,
  email: 254, // RFC 5321 maximum for a forward-path
} as const;

/** The three paths the pack routes on. These are the values `who.path` carries. */
export const LISTENING_ROLES = ["composer", "therapist", "researcher"] as const;
export type ListeningRole = (typeof LISTENING_ROLES)[number];

/** The three answers the pack's own credit question offers. */
export const CREDIT_CHOICES = ["named", "acknowledged", "anonymous"] as const;
export type CreditChoice = (typeof CREDIT_CHOICES)[number];

export interface ListeningIntakeInput {
  returnText?: unknown;
  role?: unknown;
  credit?: unknown;
  email?: unknown;
}

export interface ValidatedListeningIntake {
  /** Verbatim. Never trimmed, never re-wrapped, never quote-stripped. */
  returnText: string;
  role: ListeningRole;
  credit: CreditChoice;
  /** Empty string when the respondent did not ask for the results. */
  email: string;
  /** False when the text does not carry the marks of a pack return. */
  looksLikePackReturn: boolean;
  /** What was missing, in plain words. Empty when nothing was. */
  shapeNote: string;
}

export type ListeningIntakeResult =
  | { ok: true; value: ValidatedListeningIntake }
  | { ok: false; reason: string };

/**
 * Email clients prefix quoted lines with one or more `>`, sometimes with
 * spaces between them. The intake parser strips them the same way, repeatedly,
 * so a return forwarded through three replies still parses. This mirrors that
 * so the shape check agrees with the parser about what it is looking at.
 */
const QUOTE_MARKER = /^(?:\s*>)+\s?/;

export function stripQuoteMarkers(line: string): string {
  let previous: string | null = null;
  let out = line;
  while (previous !== out) {
    previous = out;
    out = out.replace(QUOTE_MARKER, "");
  }
  return out;
}

/** The pack stamps this as the first line of every file it writes. */
const HEADER = /^mpn listening pack/i;
/** Section headers are a bare bracketed token on their own line. */
const SECTION = /^\[[A-Za-z0-9_]+\]$/;
/** `key.sub = value`, the form every answer line takes. */
const ANSWER = /^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)+\s*=/;

export interface PackShape {
  headerSeen: boolean;
  sectionCount: number;
  answerLines: number;
}

/**
 * Looks for the marks of a pack return and counts nothing else. It reads the
 * header line and the section headers; it never reads an answer's value, and
 * it has no opinion about what any answer should be.
 */
export function inspectPackReturn(text: string): PackShape {
  const shape: PackShape = { headerSeen: false, sectionCount: 0, answerLines: 0 };
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

  for (const raw of lines) {
    const line = stripQuoteMarkers(raw.replace(/^﻿/, "")).trim();
    if (!line) continue;
    if (!shape.headerSeen && HEADER.test(line)) {
      shape.headerSeen = true;
      continue;
    }
    if (SECTION.test(line)) {
      shape.sectionCount += 1;
      continue;
    }
    if (ANSWER.test(line)) shape.answerLines += 1;
  }

  return shape;
}

/**
 * A return is recognised when it carries the header line and at least one
 * section. Both, because either one alone is something a person could type by
 * accident into the wrong box.
 */
export function describeShape(shape: PackShape): { ok: boolean; note: string } {
  const missing: string[] = [];
  if (!shape.headerSeen) missing.push("the first line, which should begin MPN LISTENING PACK");
  if (shape.sectionCount < 1) missing.push("any section heading in square brackets");
  if (missing.length === 0) return { ok: true, note: "" };
  return { ok: false, note: `this text is missing ${missing.join(", and ")}` };
}

function isRole(value: string): value is ListeningRole {
  return (LISTENING_ROLES as readonly string[]).includes(value);
}

function isCredit(value: string): value is CreditChoice {
  return (CREDIT_CHOICES as readonly string[]).includes(value);
}

export function validateListeningIntake(body: unknown): ListeningIntakeResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, reason: "body must be a JSON object" };
  }
  const input = body as ListeningIntakeInput;

  const fields: Record<keyof typeof LISTENING_LIMITS, string> = {
    returnText: "",
    role: "",
    credit: "",
    email: "",
  };

  for (const field of Object.keys(LISTENING_LIMITS) as (keyof typeof LISTENING_LIMITS)[]) {
    const raw = input[field];
    if (raw === undefined || raw === null) continue;
    // A number or an object here means a client bug or a probe. Either way the
    // value would be stringified into an email, so reject rather than coerce.
    if (typeof raw !== "string") {
      return { ok: false, reason: `${field} must be a string` };
    }
    if (raw.length > LISTENING_LIMITS[field]) {
      return {
        ok: false,
        reason: `${field} exceeds ${LISTENING_LIMITS[field]} characters`,
      };
    }
    fields[field] = raw;
  }

  // The returned text is the one value that is never touched. Line breaks and
  // indentation carry meaning to the parser that reads it, so it is checked for
  // emptiness against a trimmed copy and then forwarded exactly as it arrived.
  const returnText = fields.returnText;
  if (returnText.trim() === "") {
    return {
      ok: false,
      reason:
        "the returned text is empty. Paste the file the pack produced, or upload it, and send again",
    };
  }

  const role = fields.role.trim();
  if (!role) return { ok: false, reason: "role is required" };
  if (!isRole(role)) {
    return { ok: false, reason: `role must be one of ${LISTENING_ROLES.join(", ")}` };
  }

  const credit = fields.credit.trim();
  if (!credit) return { ok: false, reason: "credit is required" };
  if (!isCredit(credit)) {
    return { ok: false, reason: `credit must be one of ${CREDIT_CHOICES.join(", ")}` };
  }

  const email = fields.email.trim();
  if (email && !EMAIL_PATTERN.test(email)) {
    return { ok: false, reason: "email is not a valid address" };
  }

  const shape = describeShape(inspectPackReturn(returnText));

  return {
    ok: true,
    value: {
      returnText,
      role,
      credit,
      email,
      looksLikePackReturn: shape.ok,
      shapeNote: shape.note,
    },
  };
}
