/**
 * Validation and rate limiting for the public contact intake.
 *
 * /api/contact takes an unauthenticated POST and passes `email` to nodemailer's
 * address parser via replyTo, and the rest into an email body delivered to a
 * real inbox. Before this, the route destructured the body and forwarded it
 * unchecked: any type, any length, at any rate.
 *
 * Kept deliberately small. The email pattern is not RFC 5322; a complete
 * grammar is the thing that was quadratic in the first place. It only has to
 * reject the pathological and the obviously-not-an-address, and nodemailer
 * handles the rest now that it is patched.
 */

/** Longest value accepted per field. Generous for prose, hostile to abuse. */
export const LIMITS = {
  name: 200,
  email: 254, // RFC 5321 maximum for a forward-path
  company: 200,
  type: 60,
  track: 60,
  capacity: 60,
  message: 20_000,
} as const;

export type ContactField = keyof typeof LIMITS;

/** Values the client sends. Every one is optional except email and message. */
export interface ContactInput {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  type?: unknown;
  track?: unknown;
  capacity?: unknown;
  message?: unknown;
}

export interface Validated {
  name: string;
  email: string;
  company: string;
  type: string;
  track: string;
  capacity: string;
  message: string;
}

/** Deliberately simple: one @, no spaces, something either side, a dot after. */
const EMAIL = /^[^\s@]{1,64}@[^\s@.]+(?:\.[^\s@.]+)+$/;

export type ValidationResult =
  | { ok: true; value: Validated }
  | { ok: false; reason: string };

export function validateContact(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, reason: "body must be a JSON object" };
  }
  const input = body as ContactInput;
  const out = {} as Validated;

  for (const field of Object.keys(LIMITS) as ContactField[]) {
    const raw = input[field];
    if (raw === undefined || raw === null) {
      out[field] = "";
      continue;
    }
    // A number or object here means a client bug or a probe; either way the
    // value would be stringified into an email, so reject rather than coerce.
    if (typeof raw !== "string") {
      return { ok: false, reason: `${field} must be a string` };
    }
    if (raw.length > LIMITS[field]) {
      return { ok: false, reason: `${field} exceeds ${LIMITS[field]} characters` };
    }
    out[field] = raw.trim();
  }

  if (!out.email) return { ok: false, reason: "email is required" };
  if (!EMAIL.test(out.email)) return { ok: false, reason: "email is not a valid address" };
  if (!out.message) return { ok: false, reason: "message is required" };

  return { ok: true, value: out };
}

/**
 * Fixed-window per-caller limit, held in memory.
 *
 * One instance serves this site, so a shared store would be machinery without a
 * purpose. If it is ever scaled out, this becomes per-instance and the limit
 * multiplies by the instance count; that is the tradeoff being taken.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  now: number = Date.now()
): { allowed: boolean; retryAfterSeconds: number } {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    hits.set(key, recent);
    return { allowed: false, retryAfterSeconds };
  }
  recent.push(now);
  hits.set(key, recent);
  // Bound the map so a flood of distinct keys cannot grow it without limit.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Only for tests: the window is real time, and tests must not wait it out. */
export function __resetRateLimit(): void {
  hits.clear();
}
