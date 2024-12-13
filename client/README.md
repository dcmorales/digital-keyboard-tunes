<p align="center">
   <img src="app/icon.png" width="10%" alt="Digital Keyboard Tunes Logo" />
</p>

<p align="center">
    <h1 align="center">DIGITAL-KEYBOARD-TUNES: CLIENT</h1>
</p>

<p align="center">
    <em>Create custom tunes in key!</em>
</p>

<br>

<p align="center">
    <em>Client-side code built with the tools and technologies below (click on icon for official docs):</em>
</p>

<p align="center">
    <a href="https://nextjs.org/docs">
	    <img src="https://skillicons.dev/icons?i=nextjs" alt="Next.js documentation" title="Next.js">
    </a>
    <a href="https://www.typescriptlang.org/docs/">
        <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript documentation" title="TypeScript">
    </a>
    <a href="https://sass-lang.com/documentation/">
        <img src="https://skillicons.dev/icons?i=sass" alt="Sass documentation" title="Sass">
    </a>
    <a href="https://vitest.dev/guide/">
        <img src="https://skillicons.dev/icons?i=vitest" alt="Vitest documentation" title="Vitest">
    </a>
    <a href="https://testing-library.com/docs/react-testing-library/intro/">
        <img src="https://techstack-generator.vercel.app/testinglibrary-icon.svg"  alt="React Testing Library documentation" width="50" height="50" title="React Testing Library" />
    </a>
    <a href="https://pnpm.io/motivation">
        <img src="https://skillicons.dev/icons?i=pnpm" alt="PNPM documentation" title="PNPM">
    </a>
</p>

<br>
<br>

##### 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [🚀 Getting Started](#-getting-started)
  - [🔖 Requirements](#-requirements)
  - [📦 Installation](#-installation)
  - [🤖 Usage](#-usage)
  - [🎨 CSS / SCSS](#-css--scss)
  - [🧪 Tests](#-tests)
  - [🖌️ Formatting / Linting](#️-formatting--linting)

---

## 📍 Overview

Digital Keyboard Tunes client is a web application built with Next.js and TypeScript. It utilizes the Web Audio API and plays musical scales in key. Users can customize options to create their own unique sounds.

---

## 👾 Features

|     | Feature           | Description                                                                                                                                                                                                                                     |
| --- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**  | This project's frontend is built using Next.js and TypeScript. It follows a structured architecture that includes the app-router, components, and styles. Unit tests and SCSS modules are co-located by the units they are testing and styling. |
| 🔩  | **Code Quality**  | The frontend of the codebase uses TypeScript for type safety and improved code readability. Automated workflows run testing on PR requests to ensure consistency and Prettier updates to maintain a consistent code style.                      |
| 📄  | **Documentation** | The project includes detailed README files and comments within the codebase (either inline or on top of the file) to provide further context.                                                                                                   |
| 🧪  | **Testing**       | Testing the frontend is done through Vitest and React Testing Library.                                                                                                                                                                          |
| 📦  | **Dependencies**  | Key dependencies on the frontend include Next.js, React, TypeScript, Sass, and Vitest.                                                                                                                                                          |

---

## 📂 Repository Structure

```sh
└── client/
    ├── app/
    │   ├── *.test.tsx
    │   └── *.tsx
    ├── components
    │   └── */
    │       ├── index.tsx
    │       ├── *.test.tsx
    │       └── *.module.scss
    ├── context/
    │   ├── *.test.tsx
    │   └── *.tsx
    ├── hooks/
    │   ├── *.test.tsx
    │   └── *.tsx
    ├── mocks/
    │   └── *.tsx
    ├── styles/
    │   ├── variables.module.scss
    │   └── *.scss
    ├── types/
    │   └── *.ts
    ├── utils/
    │   ├── *.test.ts
    │   └── *.ts
    ├── values/
    │   └── *.ts
    ├── next.config.mjs
    ├── release.config.js
    ├── tsconfig.json
    ├── vitest.config.mts
    ├── package.json
    └── pnpm-lock.yaml
```

---

## 🚀 Getting Started

### 🔖 Requirements

You will need [nvm](https://github.com/nvm-sh/nvm). Run the following command to ensure your install was successful:

```sh
❯ nvm --version
```

### 📦 Installation

Build the project from source:

1. From the root directory, navigate to the client directory:

```sh
❯ cd client
```

2. Use the correct version of Node:

```sh
❯ nvm use
```

3. Install pnpm:

```sh
❯ npm install -g pnpm
```

4. Install dependencies:

```sh
❯ pnpm install
```

### 🤖 Usage

To run the client, execute the following command from the `client` directory:

```sh
❯ pnpm dev
```

### 🎨 CSS / SCSS

- Components should be designed with a mobile-first approach.
- Style components using modules, though there are global styles available (variables, reset, etc).
- Selectors should be grouped in a logical manner and their CSS properties should be ordered alphabetically.
- For class names, try to be clear and concise; for multi-word classes prefer camelCase.
- If a component's style is dependent on the parent, add a class to the child that makes this clear.
- Use the defined SCSS variables if possible; CSS custom properties are also welcome for runtime updates.
- Use the `@include breakpoint()` mixin to handle media queries.

```css
.example {
	&.primaryParent {
		background-color: $color-blue;
		width: 80%;
	}

	&.secondaryParent {
		border-radius: 50%;
		font-size: $font-small;

		@include breakpoint(large) {
			font-size: $font-large;
		}
	}
}
```

---

### 🧪 Tests

Vitest and React Testing Library are used for testing. Tests will run automatically after a pull request is made. You can also run the tests manually.

```sh
❯ pnpm test
```

---

### 🖌️ Formatting / Linting

ESLint is used to catch errors and maintain consistency between developers. Linting will run during Vercel's preview deployment after a pull request is made. To prevent any failures, ensure that your code passes the checks. Prettier will also run during select pull requests. You can also set VSCode to format for you automatically. Ensure the [VSCode Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) is installed. In VSCode, turn on 'format on save' and set Prettier to the default formatter. You can also run the commands manually.

```sh
# Run eslint
❯ pnpm lint

# Run prettier
❯ pnpm prettier
```

---
