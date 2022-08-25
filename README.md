# Semantic Release workflow through Github Actions

Reusable Github workflow for linting commits and make releases using
[semantic-release](https://github.com/semantic-release/semantic-release/)

## Usage

This workflow will use sensible defaults for
[commintlint](https://commitlint.js.org) and
[semantic-release](https://github.com/semantic-release/semantic-release/)

If you want to override the
[commintlint configuration](https://commitlint.js.org/#/reference-configuration),
create a file in your repo named `commintlint.config.js` and this will
be used instead of the default in this workflow.

If you want to override the
[semantic-release configuration](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md),
create a file in your repo named `.releaserc.json` and this will
be used instead of the default in this workflow.

Reference for a workflow job.

```yaml
jobs:
  commitlint_and_release:
    name: Commit lint and release
    uses: nrkno/github-workflow-semantic-release/.github/workflows/wokflow.yaml@v1
    with:
      # Define the type of machine to run the jobs on.
      # Default: self-hosted
      runs-on: ubuntu-latest
      # Enable release on main/master
      # Default: true
      release-enabled: true
```
