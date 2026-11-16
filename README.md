# CS445 CI Demo

![Tests](https://github.com/Hboahen42/cs445-ci-demo/actions/workflows/test.yml/badge.svg)

Jest tests from the Software Testing lecture (REQ-6, REQ-7, REQ-9), run automatically by GitHub Actions on every push to `main` and every pull request.

Before pushing, replace `OWNER` in the badge link above with your GitHub username.

## Run locally

```
npm install
npm test
```

Expected: **11 passed**, with a coverage table. `npm test` runs `jest --ci --coverage`. Coverage below 80% (lines or branches) fails the run; the threshold is in `package.json`.

## Demo steps

Use a **public** repository. Rulesets and Actions minutes are free for public repositories. Private repositories need GitHub Pro (free with the GitHub Student Developer Pack) for rulesets.

### Step 0: Before class

1. On GitHub, create a new **public** repository named `cs445-ci-demo`. Don't add a README.
2. In this folder:

```
npm install
npm test
git init -b main
git add .
git commit -m "LMS validators, tests, CI"
git remote add origin https://github.com/OWNER/cs445-ci-demo.git
```

### Step 1: Push and watch CI run

```
git push -u origin main
```

Open the repository's **Actions** tab, click the run, then the `test` job. Expand **Run npm test**: 11 passed and the coverage table.

### Step 2: Protect main

1. **Settings** → in the left sidebar, **Rulesets** → **New ruleset** → **New branch ruleset**.
2. Ruleset name: `protect-main`. Enforcement status: **Active**.
3. Target branches → **Add target** → **Include default branch**.
4. Check **Require a pull request before merging**. Leave required approvals at 0 for a solo demo.
5. Check **Require status checks to pass** → **Add checks** → search `test` → select it.
6. Click **Create**.

The `test` check only appears in the search after it has run once, which is why Step 1 comes first.

### Step 3: Break it on a branch

```
git switch -c refactor-length
```

In `validators.js`, change `p.length >= 8` to `p.length > 8`. Then:

```
git commit -am "Refactor password length check"
git push -u origin refactor-length
```

Open the pull request from the banner on GitHub. The `test` check fails on `REQ-6 length (existing) › at min (8)`, and merging is blocked.

### Step 4: Fix it and merge

Change `>` back to `>=`, then:

```
git commit -am "Fix REQ-6 boundary: 8 is valid"
git push
```

The check turns green. Merge the pull request and delete the branch. A new run starts on `main`.

### Step 5: The AI shortcut (deleting tests)

```
git switch main
git pull
git switch -c ai-make-ci-pass
git rm acceptance.test.js
git commit -m "Remove flaky tests"
git push -u origin ai-make-ci-pass
```

Open the pull request. All remaining tests pass, but the run fails: `lms.js` drops to 0% coverage and the 80% threshold is not met. Close the pull request without merging.

### Step 6: Security checks

```
git switch main
git switch -c add-security-checks
```

1. Add the line in `extras/audit-step.yml` as the last step of `.github/workflows/test.yml`.
2. Copy `extras/dependabot.yml` to `.github/dependabot.yml`.

```
git add .
git commit -m "Add npm audit and Dependabot"
git push -u origin add-security-checks
```

Open the pull request. `npm audit` lists low-severity advisories (as of November 2026) but passes, because only `high` or worse fails the build. Its suggested `npm audit fix --force` would downgrade Jest to an old major version: a breaking change a human should decide on. Merge the pull request; Dependabot then checks dependencies weekly and opens update pull requests, each tested by CI.
