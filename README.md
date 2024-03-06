# Semantic Release workflow through Github Actions

Reusable Github workflow for linting commits and make releases using
[semantic-release](https://github.com/semantic-release/semantic-release/)

## Usage

This workflow will use sensible defaults for
[commitlint](https://commitlint.js.org) and
[semantic-release](https://github.com/semantic-release/semantic-release/)

If you want to override the
[commitlint configuration](https://commitlint.js.org/#/reference-configuration),
create a file in your repo named `commitlint.config.js` and this will
be used instead of the default in this workflow.

If you want to override the
[semantic-release configuration](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md),
create a file in your repo named `.releaserc.json` and this will
be used instead of the default in this workflow.

Reference for a workflow job:

```yaml
permissions:
  contents: write
  pull-requests: write
  repository-projects: write

jobs:
  commitlint_and_release:
    name: Commit lint and release
    uses: nrkno/github-workflow-semantic-release/.github/workflows/workflow.yaml@v3
    with:
      # inputs
    secrets:
      # secrets
```

<!-- autodoc start -->
### Inputs
- `release-enabled` (boolean, default `true`)
- `lint-enabled` (boolean, default `true`)
- `runs-on` (string, default `"ubuntu-latest"`)
<!-- autodoc end -->
