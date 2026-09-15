#!/usr/bin/env bash
# Purge the two credentials from all 36 commits of mpn-conductor-standalone.
#
# ROTATE FIRST. This rewrites history; it does not un-publish a key that has
# been readable in a public repository since 10 January 2026. Anything already
# scraped stays scraped. Rotation at the provider is the fix; this is hygiene.
#
# Requires git-filter-repo (pip install git-filter-repo). Run on a FRESH clone,
# which is what filter-repo expects, then force-push.
set -euo pipefail
test -d .git || { echo "run this inside the repo"; exit 1; }

cat > /tmp/mpn-secrets.txt <<'SECRETS'
sk_b7544b20997b99c14349e395cddb91cefe883e0a83bea463==>ELEVENLABS_API_KEY_REMOVED
mpn_secure_2026!==>POSTGRES_PASSWORD_REMOVED
SECRETS

git filter-repo --replace-text /tmp/mpn-secrets.txt --force
rm -f /tmp/mpn-secrets.txt

echo
echo "History rewritten. Every commit hash has changed. Then:"
echo "  git remote add origin https://github.com/Planet9V/mpn-conductor-standalone.git"
echo "  git push --force --all && git push --force --tags"
echo
echo "After the force-push, ask GitHub Support to expire the cached views of"
echo "the old commits; a rewritten commit stays reachable by its old SHA until"
echo "they do. https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository"
