# GitHub Pages Index Automation

This repository contains a GitHub Actions workflow that:

1. Lists repositories you own.
2. Checks whether each repository has a `gh-pages` branch.
3. Generates a `README.md` index of published GitHub Pages URLs.
4. Pushes that generated `README.md` into your `github.io` repository.

## Setup

1. Create a Personal Access Token and store it as repository secret `GH_PAGES_TOKEN`.
2. Give the token access to:
   - Read your repositories (to list and check `gh-pages` branches).
   - Write access to your target `github.io` repository.
3. Add repository variable `GH_PAGES_INDEX_REPO` with value:
   - `your-username/your-username.github.io`

## Workflow

The workflow file is:

- `.github/workflows/update-pages-index.yml`

It runs:

- Daily at `04:17 UTC`.
- Manually through `workflow_dispatch`.
