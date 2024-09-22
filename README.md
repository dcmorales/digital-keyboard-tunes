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
    <em>Built with the tools and technologies below (click on icon for official docs):</em>
</p>

<p align="center">
    <a href="https://nextjs.org/docs">
	    <img src="https://skillicons.dev/icons?i=nextjs" alt="Next.js documentation">
    </a>
    <a href="https://www.typescriptlang.org/docs/">
        <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript documentation">
    </a>
    <a href="https://sass-lang.com/documentation/">
        <img src="https://skillicons.dev/icons?i=sass" alt="Sass documentation">
    </a>
    <a href="https://vitest.dev/guide/">
        <img src="https://skillicons.dev/icons?i=vitest" alt="Vitest documentation">
    </a>
    <a href="https://testing-library.com/docs/react-testing-library/intro/">
        <img src="https://techstack-generator.vercel.app/testinglibrary-icon.svg"  alt="React Testing Library documentation" width="50" height="50" />
    </a>
    <a href="https://docs.github.com/en/actions">
        <img src="https://skillicons.dev/icons?i=githubactions" alt="Github Actions documentation">
    </a>
    <a href="https://pnpm.io/motivation">
        <img src="https://skillicons.dev/icons?i=pnpm" alt="PNPM documentation">
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
- [📌 Project Roadmap](#-project-roadmap)
- [🤝 Contributing](#-contributing)
- [🎗 License](#-license)

---

## 📍 Overview

COMING SOON: Digital Keyboard Tunes is a web application built with Next.js and TypeScript on the frontend. It utilizes the Web Audio API and plays musical scales in key. Users can customize options to create their own unique sounds.

---

## 👾 Features

|     | Feature           | Description                                                                                                                                                                                                                       |
| --- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**  | This project's frontend is built using Next.js and TypeScript. It follows a structured architecture that includes the app-router, components, and styles. Unit tests are co-located by the units they are testing.                |
| 🔩  | **Code Quality**  | The frontend of the codebase uses TypeScript for type safety and improved code readability. Automated workflows run Vitest testing on PR requests to ensure consistency and Prettier updates to maintain a consistent code style. |
| 📄  | **Documentation** | The project includes detailed README files and comments within the codebase.                                                                                                                                                      |
| 🧪  | **Testing**       | Testing the frontend is done through Vitest and React Testing Library.                                                                                                                                                            |
| 📦  | **Dependencies**  | Key dependencies on the frontend include Next.js, React, TypeScript, Sass, and Vitest.                                                                                                                                            |

---

## 📂 Repository Structure

```sh
└── digital-keyboard-tunes/
    ├── .github
    │   └── workflows
    └── client
        └── ...
```

---

## 🧩 Modules

<details closed><summary>client</summary>

The client is built using Next.js and TypeScript. Vitest and React Testing Library handle testing while Sass is used for styling. For more details, refer to the [README.md](client/README.md) located in the client directory.

</details>

<details closed><summary>.github.workflows</summary>

| File                                                               | Summary                                                                                                                                                                             |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [test-client.yml](.github/workflows/test-client.yml)               | Runs tests whenever a pull request is made that includes changes to the client.                                                                                                     |
| [prettify-client.yml](.github/workflows/prettify-client.yml)       | Runs Prettier when a pull request is made to either the `main` or `develop` branch that includes changes to the client. If formatting is necessary, the changes are auto-committed. |
| [check-merge-branch.yml](.github/workflows/check-merge-branch.yml) | Ensures merges into `main` can only be done by `develop` and `hotfix*` branches.                                                                                                    |

</details>

---

## 🚀 Getting Started

### 🔖 Requirements

It is recommended to use a Node version manager such as [nvm](https://github.com/nvm-sh/nvm) to install the client. Once that is installed and the repo has been cloned, refer to the [README.md](client/README.md) located in the client directory for specific install steps.

## 🔄 Continuous Integration / Continuous Delivery

The repo uses Github Actions for CI/CD. Testing and linting have been automated to run on pull requests. These workflows must pass for PR's to be approved. Merging into `develop` triggers deployment to the staging site. Merging into `main` triggers deployment to the production site. Local builds can be previewed on Vercel's preview sites after creating a pull request. Changes cannot be made directly into either `develop` or `main` and must be done through pull requests instead.

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
