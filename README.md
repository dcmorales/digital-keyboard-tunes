<p align="center">
  <span style="font-size: 100px;">🎹</span>
</p>

<p align="center">
    <h1 align="center">DIGITAL-KEYBOARD-TUNES</h1>
</p>

<p align="center">
    <em>Create custom tunes in key!</em>
</p>

<br>

<p align="center">
	<img src="https://img.shields.io/github/license/dcmorales/digital-keyboard-tunes?style=default&logo=opensourceinitiative&logoColor=white&color=068a62" alt="license">
	<img src="https://img.shields.io/github/last-commit/dcmorales/digital-keyboard-tunes?style=default&logo=git&logoColor=white&color=068a62" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/dcmorales/digital-keyboard-tunes?style=default&color=068a62" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/dcmorales/digital-keyboard-tunes?style=default&color=068a62" alt="repo-language-count">
</p>

<p align="center">
    <em>Built with the tools and technologies below:</em>
</p>

<p align="center">
	<img src="https://skillicons.dev/icons?i=nextjs,ts,sass,vitest,githubactions,pnpm" alt="Next.js, TypeScript, Sass, Vitest, Github Actions, and PNPM">
</p>

<br>
<br>

##### 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [🧩 Modules](#-modules)
- [🚀 Getting Started](#-getting-started)
  - [🔖 Prerequisites](#-prerequisites)
  - [📦 Installation](#-installation)
  - [🤖 Usage](#-usage)
  - [🧪 Tests](#-tests)
- [📌 Project Roadmap](#-project-roadmap)
- [🤝 Contributing](#-contributing)
- [🎗 License](#-license)

---

## 📍 Overview

COMING SOON: Digital Keyboard Tunes is a web application built with Next.js and TypeScript on the frontend. It utilizes the Web Audio API and plays musical scales in key. Users can customize options to create their own unique sounds.

---

## 👾 Features

|     | Feature           | Description                                                                                                                                                                                                                                                          |
| --- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**  | This project's frontend is built using Next.js and TypeScript. It follows a structured architecture that includes the app-router, components, and styles. Unit tests are co-located by the unit they are testing.                                                    |
| 🔩  | **Code Quality**  | The frontend of the codebase uses TypeScript for type safety and improved code readability, enhancing overall maintainability. Automated workflows run Vitest testing on PR requests to ensure consistency and Prettier updates to maintain a consistent code style. |
| 📄  | **Documentation** | The project includes detailed README files and comments within the codebase, aiding developers in understanding the architecture and implementation details.                                                                                                         |
| 🧪  | **Testing**       | Testing the frontend is done through Vitest and React Testing Library.                                                                                                                                                                                               |
| 📦  | **Dependencies**  | Key dependencies on the frontend include Next.js, React, TypeScript, Sass, Vitest, and various packages to assist with testing, linting, and typing. Configuration files like package.json and tsconfig.json manage dependencies and project settings effectively.   |

---

## 📂 Repository Structure

```sh
└── digital-keyboard-tunes/
    ├── .github
    │   ├── ISSUE_TEMPLATE
    │   │   ├── BUG-REPORT.yml
    │   │   ├── FEATURE-REQUEST.yml
    │   │   └── config.yml
    │   ├── pull_request_template.md
    │   └── workflows
    │       ├── check-merge-branch.yml
    │       ├── prettify-client.yml
    │       └── test-client.yml
    ├── README.md
    └── client
        ├── .eslintrc.json
        ├── .gitignore
        ├── .nvmrc
        ├── .prettierignore
        ├── .prettierrc
        ├── README.md
        ├── app
        │   ├── favicon.ico
        │   ├── layout.tsx
        │   ├── page.test.tsx
        │   └── page.tsx
        ├── next.config.mjs
        ├── package.json
        ├── pnpm-lock.yaml
        ├── styles
        │   ├── base
        │   │   ├── _base.scss
        │   │   ├── _index.scss
        │   │   └── _reset.scss
        │   └── main.scss
        ├── tsconfig.json
        └── vitest.config.ts
```

---

## 🧩 Modules

<details closed><summary>client</summary>

| File                                                                                                      | Summary                   |
| --------------------------------------------------------------------------------------------------------- | ------------------------- |
| [pnpm-lock.yaml](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/pnpm-lock.yaml)     | <code>❯ REPLACE-ME</code> |
| [next.config.mjs](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/next.config.mjs)   | <code>❯ REPLACE-ME</code> |
| [.prettierignore](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/.prettierignore)   | <code>❯ REPLACE-ME</code> |
| [package.json](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/package.json)         | <code>❯ REPLACE-ME</code> |
| [.nvmrc](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/.nvmrc)                     | <code>❯ REPLACE-ME</code> |
| [tsconfig.json](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/tsconfig.json)       | <code>❯ REPLACE-ME</code> |
| [vitest.config.ts](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/vitest.config.ts) | <code>❯ REPLACE-ME</code> |
| [.eslintrc.json](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/.eslintrc.json)     | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>.github.workflows</summary>

| File                                                                                                                             | Summary                   |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| [test-client.yml](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/.github/workflows/test-client.yml)               | <code>❯ REPLACE-ME</code> |
| [prettify-client.yml](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/.github/workflows/prettify-client.yml)       | <code>❯ REPLACE-ME</code> |
| [check-merge-branch.yml](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/.github/workflows/check-merge-branch.yml) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>.github.ISSUE_TEMPLATE</summary>

| File                                                                                                                            | Summary                   |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| [BUG-REPORT.yml](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/.github/ISSUE_TEMPLATE/BUG-REPORT.yml)           | <code>❯ REPLACE-ME</code> |
| [config.yml](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/.github/ISSUE_TEMPLATE/config.yml)                   | <code>❯ REPLACE-ME</code> |
| [FEATURE-REQUEST.yml](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/.github/ISSUE_TEMPLATE/FEATURE-REQUEST.yml) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>client.app</summary>

| File                                                                                                    | Summary                   |
| ------------------------------------------------------------------------------------------------------- | ------------------------- |
| [page.test.tsx](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/app/page.test.tsx) | <code>❯ REPLACE-ME</code> |
| [layout.tsx](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/app/layout.tsx)       | <code>❯ REPLACE-ME</code> |
| [page.tsx](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/app/page.tsx)           | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>client.styles</summary>

| File                                                                                               | Summary                   |
| -------------------------------------------------------------------------------------------------- | ------------------------- |
| [main.scss](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/styles/main.scss) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>client.styles.base</summary>

| File                                                                                                         | Summary                   |
| ------------------------------------------------------------------------------------------------------------ | ------------------------- |
| [\_index.scss](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/styles/base/_index.scss) | <code>❯ REPLACE-ME</code> |
| [\_reset.scss](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/styles/base/_reset.scss) | <code>❯ REPLACE-ME</code> |
| [\_base.scss](https://github.com/dcmorales/digital-keyboard-tunes/blob/main/client/styles/base/_base.scss)   | <code>❯ REPLACE-ME</code> |

</details>

---

## 🚀 Getting Started

### 🔖 Prerequisites

**YAML**: `version x.y.z`

### 📦 Installation

Build the project from source:

1. Clone the digital-keyboard-tunes repository:

```sh
❯ git clone https://github.com/dcmorales/digital-keyboard-tunes
```

2. Navigate to the project directory:

```sh
❯ cd digital-keyboard-tunes
```

3. Install the required dependencies:

```sh
❯ ❯ INSERT-INSTALL-COMMANDS
```

### 🤖 Usage

To run the project, execute the following command:

```sh
❯ ❯ INSERT-RUN-COMMANDS
```

### 🧪 Tests

Execute the test suite using the following command:

```sh
❯ ❯ INSERT-TEST-COMMANDS
```

---

## 📌 Project Roadmap

- [ ] **`Initial keyboard`**: Set up basic functionality for keyboard
- [ ] **`Add backend`**: Add backend to repo to allow users to save custom tunes.
- [ ] **`Expand user options`**: Consider options to mark tunes as public and save as favorites.
- [ ] **`Expand keyboard options`**: Consider more advanced options in customizing and editing parts of tunes.

---

## 🤝 Contributing

Contributions are welcome! Here are ways you can contribute:

- **[Report Issues](https://github.com/dcmorales/digital-keyboard-tunes/issues)**: Submit bugs found or log feature requests for the `digital-keyboard-tunes` project using the templates provided.
- **[Submit Pull Requests](https://github.com/dcmorales/digital-keyboard-tunes/pulls)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/dcmorales/digital-keyboard-tunes
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b feature/new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin feature/new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations using the PR template provided. By Default, merges into `main` are restricted, but you can request to merge into `develop`.
8. **Ensure all tests pass**: Linting and testing will be triggered after a pull request made into `develop`. If there are any failures in these workflows, the branch will not be allowed to merge.
9. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Thank you for your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
    <img src="https://contrib.rocks/image?repo=dcmorales/digital-keyboard-tunes" alt="contributors to repo">
</p>
</details>

---

## 🎗 License

This project is protected under the [GNU GPLv3](LICENSE.txt) License.

---
