# Semantic Release workflow through Github Actions

Reusable Github workflow for linting commits and making releases using
[nrkno/github-action-sematic-release](https://github.com/nrkno/github-action-sematic-release).

## Usage

This workflow provides sensible defaults for commit linting and semantic
release using the in-house `semrel` action.

Reference for a workflow job:

```yaml
permissions:
  contents: write
  pull-requests: read

jobs:
  commitlint_and_release:
    name: Commit lint and release
    uses: nrkno/github-workflow-semantic-release/.github/workflows/workflow.yaml@v4
    with:
      # inputs
```

<!-- autodoc start -->
### Inputs
- `release-enabled` (boolean, default `true`)
- `lint-enabled` (boolean, default `true`)
- `runs-on` (string, default `"ubuntu-latest"`)

### Outputs
- `released` — `'true'` when a new release was published, `'false'` otherwise
- `version` — The new release's semantic version, e.g. `1.8.3`
- `tag` — The new release's git tag, e.g. `v1.8.3`
- `major` — Major version component, e.g. `1`
- `minor` — Minor version component, e.g. `8`
- `patch` — Patch version component, e.g. `3`
<!-- autodoc end -->

---

## Migration from codfish/semantic-release

This workflow previously used `codfish/semantic-release-action`. All output
names have been renamed and several outputs have been dropped.

### Output name mapping

| Old (`codfish`) name   | New (`semrel`) name | Notes                                                                 |
|------------------------|---------------------|-----------------------------------------------------------------------|
| `new-release-published` | `released`         | renamed                                                               |
| `release-version`      | `version`           | renamed                                                               |
| `release-major`        | `major`             | renamed                                                               |
| `release-minor`        | `minor`             | renamed                                                               |
| `release-patch`        | `patch`             | renamed                                                               |
| `git-tag`              | `tag`               | renamed                                                               |
| `release-notes`        | *(dropped)*         | no equivalent in v0.1.2; use `semrel notes` separately               |
| `type`                 | *(dropped)*         | no equivalent                                                         |
| `channel`              | *(dropped)*         | no equivalent                                                         |
| `git-head`             | *(dropped)*         | no equivalent                                                         |
| `name`                 | *(dropped)*         | no equivalent                                                         |

Update all `steps.<id>.outputs.*` references in your consuming workflows
according to the table above.

### Dropped behaviour

PR comment on lint failure has been removed. `semrel lint` exits non-zero
only — CI will fail the check.

### Overriding lint rules

Place a `.semrelrc.yml` at the root of your repository to override default lint rules:

```yaml
lint:
  rules:
    capital-first-letter: false  # allow uppercase commit descriptions
    require-scope: false         # default; set true to require scope
```

### Known limitation

On `pull_request` events, `semrel lint` resolves the commit range as
`latestAnnotatedTag → HEAD`, not `baseRef → HEAD`. Ensure all commits
since the last release tag conform to conventional commit format before
opening a PR.
