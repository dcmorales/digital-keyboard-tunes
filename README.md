<p align="center">
   <img src="client/app/icon.png" width="10%" alt="Digital Keyboard Tunes Logo" />
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
    <a href="https://pnpm.io/motivation" target="_blank">
        <img src="https://skillicons.dev/icons?i=pnpm" alt="PNPM documentation" title="PNPM" />
    </a>
    <a href="https://nextjs.org/docs" target="_blank">
	    <img src="https://skillicons.dev/icons?i=nextjs" alt="Next.js documentation" title="Next.js" />
    </a>
    <a href="https://www.typescriptlang.org/docs/" target="_blank">
        <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript documentation" title="TypeScript" />
    </a>
    <a href="https://sass-lang.com/documentation/" target="_blank">
        <img src="https://skillicons.dev/icons?i=sass" alt="Sass documentation" title="Sass" />
    </a>
    <a href="https://vitest.dev/guide/" target="_blank">
        <img src="https://skillicons.dev/icons?i=vitest" alt="Vitest documentation" title="Vitest" />
    </a>
    <a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">
        <img src="https://res.cloudinary.com/dvuzczntd/image/upload/v1740446393/testing-library_gisg7x.svg" alt="React Testing Library documentation" height="48" width="48" title="React Testing Library" />
    </a>
    <a href="https://playwright.dev/docs/intro" target="_blank">
        <img src="https://res.cloudinary.com/dvuzczntd/image/upload/v1740446109/playwright_ayrxjk.svg" alt="Playwright documentation" height="48" width="48" title="Playwright" />
    </a>
    <a href="https://prettier.io/docs/en/" target="_blank">
        <img src="https://res.cloudinary.com/dvuzczntd/image/upload/v1737010974/logos--prettier_zgzs4m.svg" alt="Prettier documentation" height="48" width="48" title="Prettier" style="border-radius: 8px;" />
    </a>
    <a href="https://docs.github.com/en/actions" target="_blank">
        <img src="https://skillicons.dev/icons?i=githubactions" alt="Github Actions documentation" title="Github Actions" />
    </a>
    <a href="https://semantic-release.gitbook.io/semantic-release" target="_blank">
        <img src="https://res.cloudinary.com/dvuzczntd/image/upload/v1737010736/logos--semantic-release_qqm6uy.svg" alt="Semantic-Release documentation" height="48" width="48" title="Semantic-Release" />
    </a>
</p>

<br>
<br>

##### 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [🧩 Modules](#-modules)
- [🚀 Getting Started](#-getting-started)
  - [🔖 Requirements](#-requirements)
- [🔄 Continuous Integration / Continuous Delivery](#-continuous-integration--continuous-delivery)
- [🏷️ Releases](#️-releases)
- [📌 Project Roadmap](#-project-roadmap)
- [🤝 Contributing](#-contributing)
- [🎗 License](#-license)

---

## 📍 Overview

Digital Keyboard Tunes is a web application built with Next.js and TypeScript on the frontend. It utilizes the Web Audio API and plays musical scales in key. Users can customize options to create their own unique sounds.

---

## 👾 Features

|     | Feature           | Description                                                                                                                                                                                                                                     |
| --- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**  | This project's frontend is built using Next.js and TypeScript. It follows a structured architecture that includes the app-router, components, and styles. Unit tests and SCSS modules are co-located by the units they are testing and styling. |
| 🔩  | **Code Quality**  | The frontend of the codebase uses TypeScript for type safety and improved code readability. Automated workflows run Vitest testing on PR requests to ensure consistency and Prettier updates to maintain a consistent code style.               |
| 📄  | **Documentation** | The project includes detailed README files and comments within the codebase (either inline or on top of the file) to provide further context.                                                                                                   |
| 🧪  | **Testing**       | Testing the frontend is done through Vitest and React Testing Library. Playwright is used for end-to-end testing.                                                                                                                               |
| 📦  | **Dependencies**  | Key dependencies on the frontend include Next.js, React, TypeScript, Sass, and Vitest.                                                                                                                                                          |

---

## 📂 Repository Structure

```sh
└── digital-keyboard-tunes/
    ├── .github/
    │   └── workflows/
    │       └── *.yml
    └── client/
        ├── app/
        ├── components/
        ├── context/
        ├── e2e/
        ├── hooks/
        ├── mocks/
        ├── styles/
        ├── types/
        ├── utils/
        ├── values/
        ├── *.config.*
        ├── *.rc*
        ├── package.json
        └── pnpm-lock.yaml
```

A more detailed breakdown of the client directory structure can be found in the [client README.md](client/README.md).

---

## 🧩 Modules

<details closed><summary>.github.workflows</summary>

| File                                                                         | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [add-conventional-commit.yml](.github/workflows/add-conventional-commit.yml) | Creates a conventional commit to an approved pull request based on the PR title; PR title must begin with a conventional commit prefix unless the merge is `develop` into `main` or `main` into `develop`. Other details may be added to the commit through the PR body. The only scopes allowed are `client` or `server`, in addition to no scope. A semicolon(;) can be used to separate multiple commits in the PR title, though only one commit per scope is allowed. These commits will be analyzed during the release process. |
| [check-merge-branch.yml](.github/workflows/check-merge-branch.yml)           | Ensures merges into `main` can only be done by `develop`, `hotfix*`, or `release*` branches.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [frontend-release.yml](.github/workflows/frontend-release.yml)               | Runs semantic-release after a merge into main. Commits containing the scope `server` will be ignored while those containing `client` or no scope will be analyzed. If a release is triggered, a pull request is created with the changes made to the client `CHANGELOG.md` and `package.json`. A Github release will also be created with the changes.                                                                                                                                                                               |
| [playwright.yml](.github/workflows/playwright.yml)                           | Runs end-to-end tests (including accessibility checks) on staging site after merges into `develop` are made. The reports are uploaded for review.                                                                                                                                                                                                                                                                                                                                                                                    |
| [prettify-client.yml](.github/workflows/prettify-client.yml)                 | Runs Prettier when a pull request is made to either the `main` or `develop` branch that includes changes to the client. If formatting is necessary, the changes are auto-committed.                                                                                                                                                                                                                                                                                                                                                  |
| [restrict-approved-label.yml](.github/workflows/restrict-approved-label.yml) | Restricts the use of the `approved` label so that only the repo owner can apply it.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [test-client.yml](.github/workflows/test-client.yml)                         | Runs frontend unit tests and enforces a minimum code coverage of 85% whenever a pull request includes changes to the client. The coverage report is uploaded for review.                                                                                                                                                                                                                                                                                                                                                             |

</details>

<details closed><summary>client</summary>

The client is built using Next.js and TypeScript. Vitest and React Testing Library handle testing while Sass is used for styling. For more details, refer to the [README.md](client/README.md) located in the client directory.

</details>

---

## 🚀 Getting Started

### 🔖 Requirements

It is recommended to use a Node version manager such as [nvm](https://github.com/nvm-sh/nvm) to install the client. Once that is installed and the repo has been cloned, refer to the [README.md](client/README.md) located in the client directory for specific install steps.

## 🔄 Continuous Integration / Continuous Delivery

The repo uses Github Actions for CI/CD. Testing and linting have been automated to run on pull requests. These workflows must pass for PR's to be approved. Merging into `develop` triggers deployment to the staging site. Merging into `main` triggers deployment to the production site. Local builds can be previewed on Vercel's preview sites after creating a pull request. Changes cannot be made directly into either `develop` or `main` and must be done through pull requests instead. With this setup, `develop` will have the latest code while `main` will have the most stable code.

## 🏷️ Releases

Releases for the frontend are handled by semantic-release. After merges ino `main`, semantic-release will analyze commits and search for conventional commits that trigger a release. Rather than change the commit process, there is a Github Action workflow that will create this commit based on the pull request title.

Because of this, each PR must begin with a conventional commit prefix (`build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `style`, or `test`), with an optional scope in parenthesis. The scope should match the area of the code that is being affected: `client` for frontend changes, `server` for backend changes, and no scope for changes that don't fall into either scope, such as CI/CD updates. The scope will be analyzed by its respective release tool while the other scope will be ignored (no scope changes will be included on both frontend and backend releases).

Through the PR body, other details may be added, such as the commit body and footer. A semicolon(;) can be used to separate multiple commits in the PR title, though only one commit per scope is allowed. Once the PR is approved, a commit will be created containing all of these details. While not all prefixes trigger a release, they are required in the PR to provide consistency

When a frontend release is triggered, a pull request is created with the changes made to the [client CHANGELOG.md](client/CHANGELOG.md) and `package.json` version. A Github release will also be created with the changes. Tags for the frontend will be formatted as `client-v${version}`.

---

## 📌 Project Roadmap

- [x] **`Initial keyboard`**: Set up basic functionality for keyboard
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
3. **Create a New Branch**: Always work on a new branch (branch off of `develop` for the latest code), giving it a descriptive name.
   ```sh
   git checkout -b feat/new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally. Be sure to follow the guidelines provided in the other README files.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin feat/new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Make sure the title begins with a conventional commit prefix (`build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `style`, or `test`) for use in a Github Actions workflow later (see Releases section for more details). Clearly describe the changes and their motivations using the PR template provided. Merges into `main` are not allowed and will cause a Github Actions workflow to fail, but you can request to merge into `develop`.
8. **Ensure all tests pass**: Linting and testing will be triggered after a pull request is made into `develop`. If there are any failures in these workflows, the PR will not be approved and the branch will not be allowed to merge.
9. **Review**: Once your PR is reviewed and approved, it will be merged into the `develop` branch. Thank you for your contribution!
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
