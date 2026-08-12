"use client";

import { useState } from "react";

export interface ContactFormPayload {
  name: string;
  email: string;
  company: string;
  type: string;
  track?: string;
  capacity?: string;
  message: string;
}

interface MailtoParts {
  subject: string;
  body: string;
}

interface UseContactFormResult {
  submitted: boolean;
  error: string | null;
  submit: (payload: ContactFormPayload, mailto: MailtoParts) => Promise<void>;
  reset: () => void;
}

export function useContactForm(): UseContactFormResult {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: ContactFormPayload, mailto: MailtoParts) => {
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Contact API responded with status ${res.status}`);
      }

      setSubmitted(true);
    } catch (err) {
      console.warn("Contact API failed, falling back to mailto", err);
      setError(
        "We couldn't send this automatically — opening your email client instead. If nothing happens, email us directly at jim@eigenia.nl."
      );

      const subject = encodeURIComponent(mailto.subject);
      const body = encodeURIComponent(mailto.body);
      window.location.href = `mailto:jim@eigenia.nl?subject=${subject}&body=${body}`;

      setSubmitted(true);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setError(null);
  };

  return { submitted, error, submit, reset };
}
