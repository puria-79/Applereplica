#!/usr/bin/env bash
set -euo pipefail

owner="${1:?owner is required}"
output_file="${2:-README.md}"

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI is required but not found."
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required but not found."
  exit 1
fi

tmp_rows="$(mktemp)"
count=0

while IFS= read -r repo_b64; do
  repo_json="$(printf '%s' "$repo_b64" | base64 --decode)"

  repo_name="$(printf '%s' "$repo_json" | jq -r '.name')"
  repo_url="$(printf '%s' "$repo_json" | jq -r '.html_url')"
  description="$(printf '%s' "$repo_json" | jq -r '.description // ""')"

  if gh api "/repos/$owner/$repo_name/branches/gh-pages" >/dev/null 2>&1; then
    if [ "$repo_name" = "$owner.github.io" ]; then
      page_url="https://$owner.github.io/"
    else
      page_url="https://$owner.github.io/$repo_name/"
    fi

    description="${description//$'\n'/ }"
    description="${description//|/\\|}"
    printf '| [%s](%s) | [%s](%s) | %s |\n' \
      "$repo_name" "$repo_url" "$page_url" "$page_url" "$description" >> "$tmp_rows"
    count=$((count + 1))
  fi
done < <(gh api --paginate "/user/repos?per_page=100&type=owner&sort=full_name&direction=asc" --jq '.[] | @base64')

{
  echo "# GitHub Pages Index"
  echo
  echo "Auto-generated on $(date -u '+%Y-%m-%d %H:%M UTC')."
  echo
  if [ "$count" -eq 0 ]; then
    echo "No repositories with a \`gh-pages\` branch were found."
  else
    echo "| Repository | Published Page | Description |"
    echo "| --- | --- | --- |"
    sort "$tmp_rows"
  fi
} > "$output_file"

rm -f "$tmp_rows"
