Here’s your complete `CONTRIBUTING.md` file ready to copy for **EcoVerse**. 

````md
# 🤝 Contributing to EcoVerse

First off — **thank you!** We are thrilled that you're interested in helping us build a more sustainable future. Whether you're fixing a bug, adding a new eco-feature, or improving documentation, your contribution makes a difference.

EcoVerse is part of **GSSoC '26** and we welcome contributors of all experience levels!

---

# 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Project Architecture](#-project-architecture)
- [Contribution Workflow](#-contribution-workflow)
  - [Step 1 — Find or Create an Issue](#step-1--find-or-create-an-issue)
  - [Step 2 — Fork & Clone](#step-2--fork--clone)
  - [Step 3 — Environment Setup](#step-3--environment-setup)
  - [Step 4 — Make Your Changes](#step-4--make-your-changes)
  - [Step 5 — Commit & Push](#step-5--commit--push)
  - [Step 6 — Open a Pull Request](#step-6--open-a-pull-request)
- [Coding Standards](#-coding-standards)
- [Need Help?](#-need-help)

---

# 🙌 Code of Conduct

By participating in EcoVerse, you agree to maintain a respectful and welcoming environment for everyone.

Please be kind, constructive, and collaborative while contributing.

---

# 💡 How Can I Contribute?

| Category | Description |
|---|---|
| 🐛 Bug Fixes | Solve issues related to barcode scanning, authentication, or UI glitches |
| ✨ Features | Add sustainability metrics, rewards, analytics, or leaderboard features |
| 🎨 UI/UX | Improve responsiveness, accessibility, or overall design |
| 📖 Documentation | Improve README, setup guides, or comments |
| 🧪 Testing | Add unit/integration tests and improve reliability |

---

# 🏗️ Project Architecture

EcoVerse uses a modern full-stack architecture:

- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **Authentication:** Firebase Auth
- **Database:** MongoDB + Mongoose
- **Scanning:** `@zxing/browser`
- **Cloud Functions:** Firebase Functions

---

# 🔄 Contribution Workflow

## Step 1 — Find or Create an Issue

- Browse the existing issues.
- Comment on the issue you want to work on.
- Wait for maintainers to assign it to you before starting.

If your idea is new, create a fresh issue first for discussion.

---

## Step 2 — Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/EcoVerse.git
cd EcoVerse

git remote add upstream https://github.com/Shiv24angi/EcoVerse.git
````

---

## Step 3 — Environment Setup

### Install Dependencies

```bash
npm install
```

### Create `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

MONGODB_URI=your_mongodb_connection_string
```

### Run Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Step 4 — Make Your Changes

Create a new branch:

```bash
git checkout -b feat/your-feature-name
```

Guidelines:

* Follow existing TypeScript patterns
* Keep components reusable
* Test changes locally before pushing

---

## Step 5 — Commit & Push

We follow **Conventional Commits**.

### Examples

| Prefix      | Usage                 |
| ----------- | --------------------- |
| `feat:`     | New feature           |
| `fix:`      | Bug fix               |
| `docs:`     | Documentation changes |
| `style:`    | UI or styling updates |
| `refactor:` | Code cleanup          |

### Commit Example

```bash
git add .

git commit -m "feat: add sustainability badges to dashboard"

git push origin feat/your-feature-name
```

---

## Step 6 — Open a Pull Request

* Open a PR against the main repository
* Clearly explain your changes
* Link the issue it solves

Example:

```txt
Closes #12
```

* Add screenshots for UI changes if applicable

---

# 🎨 Coding Standards

## TypeScript

* Use proper interfaces and types
* Avoid using `any`

## Styling

* Use Tailwind CSS utility classes
* Avoid inline styles

## Components

* Keep components reusable and modular
* Store reusable components inside `src/components`

## Cleanup

Before submitting:

* Remove unused imports
* Remove `console.log`
* Ensure no build warnings/errors exist

---

# ✨ Need Help?

If you get stuck:

* Open a GitHub Discussion
* Ask in the GSSoC Discord
* Reach out to maintainers through issues

We’re happy to help contributors learn and grow 🌱

---

# 🌍 Happy Coding!

Thank you for contributing to EcoVerse and helping build a more sustainable future 🚀

```
```
