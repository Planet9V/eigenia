/**
 * Canonical origin for absolute URLs (metadataBase, canonicals, OpenGraph,
 * sitemap, robots, JSON-LD).
 *
 * eigenia.nl is the domain actually configured on the Railway service.
 * eigenia.com appears in company copy but is not wired up as a domain; when it
 * is, set NEXT_PUBLIC_SITE_URL rather than editing call sites.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eigenia.nl";
