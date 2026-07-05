# Node CI Starter

A minimal Node.js project for learning GitHub Actions CI/CD. Zero dependencies — tests use Node's built-in test runner.

## What's inside

```
├── .github/
│   └── workflows/
│       └── ci.yml          ← the GitHub Actions workflow (the star of the show)
├── src/
│   └── app.js              ← simple functions (incident codes, severity validation)
├── test/
│   └── app.test.js         ← tests run by `npm test`
├── package.json
└── .gitignore
```

## Try it locally first

```bash
npm test     # should show 4 passing tests
npm start    # runs the demo
```

## Step-by-step: getting CI running on GitHub

### 1. Create the repo

On github.com → New repository → name it (e.g. `node-ci-starter`), public or private. Don't initialize with a README (we already have one).

### 2. Push this code to main

From this project folder:

```bash
git init
git add .
git commit -m "Initial commit: app + tests"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/node-ci-starter.git
git push -u origin main
```

The push to `main` will trigger the workflow immediately — go to the **Actions** tab on GitHub and watch it run.

### 3. Create a feature branch and open a PR

```bash
git checkout -b feature/ci-setup
```

Make a small change (e.g. add a test, or tweak `ci.yml`), then:

```bash
git add .
git commit -m "Tweak CI config"
git push -u origin feature/ci-setup
```

GitHub will show a banner to open a Pull Request. Open it against `main` — the CI workflow runs automatically on the PR, and you'll see checks (one per Node version in the matrix) directly in the PR view.

### 4. Watch a failure (the fun part)

Break a test on purpose — e.g. in `test/app.test.js`, change `'INC-0001'` to `'INC-001'` — commit, and push. The PR will show a red ❌. Fix it, push again, and watch it go green ✅. That's the CI feedback loop.

### 5. Secrets (for later)

Never hard-code tokens or API keys in the workflow file or code — everything in the repo (and release assets) can be exposed. Instead:

1. Repo → **Settings → Secrets and variables → Actions → New repository secret**
2. Reference it in the workflow as `${{ secrets.MY_SECRET_NAME }}`

There's a commented-out example at the bottom of `ci.yml`.

## Key concepts in `ci.yml`

- **`on:`** — triggers. Here: pushes to main and PRs targeting main.
- **`jobs:`** — units of work, each on a fresh VM.
- **`strategy.matrix`** — runs the same job across Node 18/20/22 in parallel.
- **`uses:`** — reusable actions from the marketplace (checkout, setup-node).
- **`run:`** — plain shell commands.
- **`${{ }}`** — expression syntax for variables, matrix values, and secrets.
