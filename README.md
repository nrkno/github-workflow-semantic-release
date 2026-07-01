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
    uses: nrkno/github-workflow-semantic-release/.github/workflows/workflow.yaml@v5.0.2
    secrets: inherit
    with:
      # inputs
```

<!-- NOTE: the auto-generated usage example below has a known upstream bug
(nrkno/github-action-action-workflow-autodoc) — it nests a reusable-workflow
`uses:` inside `steps:` (invalid syntax) and hardcodes @main instead of the
real pinned version. See the hand-written Usage section elsewhere in this
README for the correct, working example. -->
<!-- autodoc start -->
### Inputs
- `release-enabled` (boolean, default `true`)
- `lint-enabled` (boolean, default `true`)
- `runs-on` (string, default `"ubuntu-latest"`)
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
| `release-notes`        | *(dropped)*         | no equivalent in v0.12.1; use `semrel notes` separately               |
| `type`                 | *(dropped)*         | no equivalent                                                         |
| `channel`              | *(dropped)*         | no equivalent                                                         |
| `git-head`             | *(dropped)*         | no equivalent                                                         |
| `name`                 | *(dropped)*         | no equivalent                                                         |

Update all `steps.<id>.outputs.*` references in your consuming workflows
according to the table above.

### Dropped behaviour

PR comment on lint failure has been removed. `semrel lint` exits non-zero
only — CI will fail the check.

### Overriding configuration with `.semrelrc.yml`

Place a `.semrelrc.yml` at the root of your repository to override `semrel`'s
default behaviour. Full schema:

```yaml
# .semrelrc.yml — full schema
lint:
  rules:
    capital-first-letter: true   # fail on uppercase first letter of commit description (default: true)
    require-scope: false         # require a scope, e.g. "feat(scope): ..." (default: false)
bump-rules:                      # commit type -> version bump level (major/minor/patch/none)
  breaking-change: major
  feat: minor
  fix: patch
release-branches: [main, master] # branches allowed to trigger `semrel release`
tag-prefix: "v"                  # string prepended to version numbers in git tags
commit-types:
  extra-types: []                # additional commit types accepted on top of the built-in set
  allowed-types: []              # full replacement for the built-in type set (takes precedence over extra-types)
initial-version: "0.0.0"         # baseline version used for the first release (no prior tags)
```

Any field left out of the file keeps its default value. See the action's
[`docs/configuration.md`](https://github.com/nrkno/github-action-sematic-release/blob/main/docs/configuration.md)
for the complete reference, including per-field defaults and edge cases.

### Known limitation

On `pull_request` events, `semrel lint` resolves the commit range as
`latestAnnotatedTag → HEAD`, not `baseRef → HEAD`. Ensure all commits
since the last release tag conform to conventional commit format before
opening a PR.

## Notifications

This repository ships its own `notify.yml`, which triggers on
`release: published`. Once a release is published — via `workflow.yaml`'s
`release` job creating a GitHub Release — `notify.yml` fires automatically
and posts a comment on every PR included in that release, linking back to
the release.

No consumer action is needed for this to work in *this* repository: it
requires `pull-requests: write` permission, which is already declared in
the workflow itself. Note that `notify.yml` triggers on its own repo's
`release` event and is not part of the reusable `workflow.yaml` — repos that
consume `workflow.yaml` and want the same PR-notification behaviour should
add an equivalent workflow of their own.

