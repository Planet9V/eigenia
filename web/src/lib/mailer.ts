import nodemailer from "nodemailer";

const RECIPIENT = "jim@eigenia.nl";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export interface ContactSubmission {
  name?: string;
  email?: string;
  company?: string;
  type?: string;
  track?: string;
  message?: string;
  capacity?: string;
}

export async function sendContactEmail(submission: ContactSubmission): Promise<void> {
  const { name, email, company, type, track, message, capacity } = submission;

  const subject = `[Eigenia Website] ${type || "Contact"} - ${company || name || email}`;

  const textLines = [
    `Name: ${name || ""}`,
    `Email: ${email || ""}`,
    `Company/Organization: ${company || ""}`,
    type ? `Type: ${type}` : null,
    track ? `Track: ${track}` : null,
    capacity ? `Capacity: ${capacity}` : null,
    "",
    "Message:",
    message || "",
  ].filter((line): line is string => line !== null);

  await getTransporter().sendMail({
    from: `"Eigenia Website" <${process.env.SMTP_USER}>`,
    to: RECIPIENT,
    replyTo: email,
    subject,
    text: textLines.join("\n"),
  });
}

/**
 * One returned MPN listening pack file.
 *
 * The text is the whole of the return. It goes out twice: as a .txt attachment,
 * which is the copy to save, and inside the body between two markers, which is
 * the copy that survives a mail client that strips attachments. Neither copy is
 * edited, because the parser that reads it depends on the line breaks and the
 * six-space continuation indent, and the intake protocol says a returned file
 * is never repaired in place.
 */
export interface ListeningReturnSubmission {
  returnText: string;
  role: string;
  credit: string;
  email?: string;
  looksLikePackReturn: boolean;
  shapeNote: string;
}

const LISTENING_ROLE_LABELS: Record<string, string> = {
  composer: "Composer or music director",
  therapist: "Music therapist",
  researcher: "Researcher or methodologist",
};

const LISTENING_CREDIT_LABELS: Record<string, string> = {
  named: "name me in any write-up",
  acknowledged: "acknowledge me without naming the judgement",
  anonymous: "keep me anonymous",
};

export async function sendListeningReturnEmail(
  submission: ListeningReturnSubmission
): Promise<void> {
  const { returnText, role, credit, email, looksLikePackReturn, shapeNote } = submission;

  // Timestamp only. The wave and the respondent code are assigned on receipt,
  // per the intake protocol, so the filename here is a holding name and the
  // body says so rather than guessing at one that would have to be corrected.
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, "");
  const filename = `lp2-return-${role}-${stamp}.txt`;

  const subject = looksLikePackReturn
    ? `[MPN listening pack] return, ${role}`
    : `[MPN listening pack] return, ${role}, shape not recognised`;

  const textLines = [
    "A listening pack return arrived through the website form.",
    "",
    `Path declared on the form: ${LISTENING_ROLE_LABELS[role] ?? role}`,
    `Credit: ${LISTENING_CREDIT_LABELS[credit] ?? credit}`,
    `Return address: ${email || "none given, no results wanted"}`,
    `Shape check: ${looksLikePackReturn ? "recognised as a pack return" : `not recognised, ${shapeNote}`}`,
    "",
    `Attached as ${filename}. File it under the name the protocol gives it,`,
    "taking the path from the who.path line inside the file rather than from",
    "the form, and taking the code from the order of receipt.",
    "",
    "The same text follows verbatim, for the case where the attachment does not",
    "survive the trip. Nothing has been trimmed, re-wrapped or unquoted.",
    "",
    "----- begin returned text -----",
    returnText,
    "----- end returned text -----",
  ];

  await getTransporter().sendMail({
    from: `"Eigenia Website" <${process.env.SMTP_USER}>`,
    to: RECIPIENT,
    replyTo: email || undefined,
    subject,
    text: textLines.join("\n"),
    attachments: [
      {
        filename,
        content: returnText,
        contentType: "text/plain; charset=utf-8",
      },
    ],
  });
}
