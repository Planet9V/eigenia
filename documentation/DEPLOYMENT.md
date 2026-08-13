# Deployment & Local Setup

This replaces the old root-level `DEPLOYMENT.md` and `DEPLOYMENT_GUIDE.md`,
which had drifted apart and described two different, contradictory
architectures (one Railway/Docker, one Cloudflare Pages + GitHub Actions
that was never actually implemented — no `.github/workflows/` exists in
this repo). Railway is what's actually running in production.

## Local development

```bash
cd web
npm install
npm run dev
# http://localhost:3000 (or whatever port you pass, e.g. -- -p 4500)
```

## Environment variables

Contact-form email delivery needs SMTP credentials. Copy these into
`web/.env.local` (gitignored, never commit it):

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=jim@eigenia.nl
SMTP_PASS=<mailbox password>
```

Hostinger SMTP, not Google Workspace — port 465, `secure: true`. See
`web/src/lib/mailer.ts` for the transporter config. Without these set,
`/api/contact` will fail; the client still falls back to a `mailto:` draft
and shows a visible error banner (`useContactForm` hook), it doesn't fail
silently.

## Production build

```bash
cd web
npm run build
npm run start
```

**Always run `npm run build` after any change and confirm it passes clean
before considering work done** — a failed build here is a failed Railway
build in production, not a caught-locally error.

## Production deployment (Railway)

Production is Railway, project `748fa91d-94c9-4a6e-af82-7b8250620c34`,
service `eigenia` (`0caad606-cd21-4f29-bb5b-772c80f8c40c`), building from
the **root** `Dockerfile` (`railway.json` points `dockerfilePath` at it).
That Dockerfile does `COPY web ./` and `COPY references ./references` —
the content directory is baked into the image at build time, so a content
change requires a rebuild/redeploy, not just a file update.

- Push to `main` on GitHub (`Planet9V/eigenia`) — Railway auto-builds from
  there.
- Custom domain `eigenia.nl` is configured on the Railway service.
  **`eigenia.com` is used throughout site metadata/copy but is NOT
  currently configured as a Railway domain** — see
  [KNOWN_ISSUES.md](./KNOWN_ISSUES.md).
- Set/inspect environment variables (including the `SMTP_*` ones above) via
  the Railway dashboard or the `Railway` MCP tool's `list-variables` /
  `set-variables`.

### `web/Dockerfile` + `web/docker-compose.yml` — local-only, not what Railway uses

There's a second Dockerfile inside `web/` with its own `docker-compose.yml`.
It's a standalone local container option (`docker compose up --build` from
inside `web/`) — useful for testing the containerized build without
Railway, but it does **not** copy `references/` (its build context is
`web/` only, it can't reach `../references`), so a container built from it
will be missing paper/wiki content. Don't use it as a stand-in for the
production build; use the root Dockerfile for that.

## Verifying a deploy

1. `npm run build` locally — must pass clean.
2. Check the live site (light *and* dark mode) for anything visual you
   touched — a page that type-checks but renders wrong isn't done.
3. If you touched the contact form: submit it live and confirm the email
   actually lands (or check Railway logs if you don't have inbox access).

## Support contact

jim@eigenia.nl — also where deployment issues, security reports, and
board-inquiry dispatches go (this is the same inbox `/api/contact`
delivers to).
