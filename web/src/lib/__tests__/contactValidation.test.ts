import { describe, it, expect, beforeEach } from "vitest";
import { validateContact, rateLimit, __resetRateLimit, LIMITS } from "../contactValidation";

const good = { name: "Jim", email: "jim@eigenia.nl", message: "hello" };

describe("validateContact", () => {
  it("accepts a normal submission and trims", () => {
    const r = validateContact({ ...good, name: "  Jim  " });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.name).toBe("Jim");
      expect(r.value.email).toBe("jim@eigenia.nl");
      // absent optional fields become empty strings, not undefined
      expect(r.value.company).toBe("");
    }
  });

  it("rejects a body that is not an object", () => {
    for (const bad of ["string", 42, null, [], true]) {
      expect(validateContact(bad).ok).toBe(false);
    }
  });

  it("rejects a non-string field rather than coercing it", () => {
    // this would otherwise be stringified into an email body
    const r = validateContact({ ...good, name: { toString: () => "x" } });
    expect(r.ok).toBe(false);
  });

  it("requires email and message", () => {
    expect(validateContact({ message: "hi" }).ok).toBe(false);
    expect(validateContact({ email: "a@b.co" }).ok).toBe(false);
  });

  it("rejects addresses that are not addresses", () => {
    for (const email of ["nope", "a@b", "a b@c.co", "@b.co", "a@.co", ""]) {
      expect(validateContact({ ...good, email }).ok).toBe(false);
    }
  });

  it("rejects the oversized address the quadratic parser choked on", () => {
    const huge = "a".repeat(40_000) + "@example.com";
    const r = validateContact({ ...good, email: huge });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toContain("email");
  });

  it("caps every field at its documented limit", () => {
    for (const [field, max] of Object.entries(LIMITS)) {
      const at = validateContact({ ...good, [field]: "x".repeat(max) });
      const over = validateContact({ ...good, [field]: "x".repeat(max + 1) });
      // at the limit may still fail validation for format reasons (email), but
      // never for length; over the limit must always fail
      expect(over.ok).toBe(false);
      if (field !== "email") expect(at.ok).toBe(true);
    }
  });
});

describe("rateLimit", () => {
  beforeEach(() => __resetRateLimit());

  it("allows the first five and blocks the sixth", () => {
    for (let i = 0; i < 5; i++) expect(rateLimit("1.2.3.4").allowed).toBe(true);
    const blocked = rateLimit("1.2.3.4");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("keeps callers separate", () => {
    for (let i = 0; i < 5; i++) rateLimit("1.1.1.1");
    expect(rateLimit("2.2.2.2").allowed).toBe(true);
  });

  it("lets a caller back in once the window has passed", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 5; i++) rateLimit("3.3.3.3", t0);
    expect(rateLimit("3.3.3.3", t0).allowed).toBe(false);
    expect(rateLimit("3.3.3.3", t0 + 10 * 60 * 1000 + 1).allowed).toBe(true);
  });
});
