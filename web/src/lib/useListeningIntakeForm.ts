"use client";

import { useState } from "react";

export interface ListeningIntakePayload {
  returnText: string;
  role: string;
  credit: string;
  email: string;
}

interface UseListeningIntakeFormResult {
  submitted: boolean;
  sending: boolean;
  /** Set when the return did not arrive. The text is still in the textarea. */
  error: string | null;
  /** Set when the return arrived but did not look like a pack return. */
  notice: string | null;
  submit: (payload: ListeningIntakePayload) => Promise<void>;
  reset: () => void;
}

/**
 * Sibling of useContactForm, with one deliberate difference.
 *
 * useContactForm falls back to a mailto: link when the API is unreachable. That
 * works for a paragraph and fails for a pack return: a full return runs to tens
 * of thousands of characters and mail clients truncate a mailto body long
 * before that, so the fallback would silently deliver half a judgement. Here a
 * failure stays a failure, the text stays on the page where the respondent can
 * still copy it, and the error says where to send it by hand.
 */
export function useListeningIntakeForm(): UseListeningIntakeFormResult {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const submit = async (payload: ListeningIntakePayload) => {
    setError(null);
    setNotice(null);
    setSending(true);

    try {
      const res = await fetch("/api/listening-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: unknown = await res.json().catch(() => null);
      const parsed = (data ?? {}) as {
        error?: string;
        shapeNote?: string;
        looksLikePackReturn?: boolean;
      };

      if (!res.ok) {
        setError(
          parsed.error ??
            `The return was not accepted (status ${res.status}). Your text is still on this page. Copy it and email it to jim@eigenia.nl and it will be filed exactly the same way.`
        );
        return;
      }

      if (parsed.looksLikePackReturn === false) {
        setNotice(
          parsed.shapeNote
            ? `It was sent unchanged, but it does not read like a pack return: ${parsed.shapeNote}. Nothing was dropped. If you pasted the wrong thing, send the right one and the first will be set aside.`
            : "It was sent unchanged, but it does not read like a pack return. Nothing was dropped."
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.warn("Listening intake API failed", err);
      setError(
        "The return could not be sent. Your text is still on this page. Copy it and email it to jim@eigenia.nl and it will be filed exactly the same way."
      );
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setError(null);
    setNotice(null);
  };

  return { submitted, sending, error, notice, submit, reset };
}
