# Electron Starter ⚡

![Static Badge](https://img.shields.io/badge/license-MIT-brightgreen?label=LICENSE)

A modern, high-performance starter template built with **Electron**, **React**, **Vite**, and **Tailwind CSS**. Designed for fast development, keeping the app size small and the DX (Developer Experience) smooth.

---

## 🚀 Getting Started

### Requirements

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) (Recommended) or npm/yarn/pnpm

### Install dependencies

```bash
bun install
```

### Run (Development)

This command concurrently runs the Vite dev server and the Electron main process.

```bash
bun dev
```

### Build (Windows)

To package the application for Windows (`.exe` installer):

```bash
bun run build:win
```

The output installer will be in the `release/` directory.

---

## 🛠 Tech Stack

- **[Electron](https://www.electronjs.org/)** – Cross-platform desktop application framework
- **[Vite](https://vitejs.dev/)** – Next Generation Frontend Tooling
- **[React 19](https://react.dev/)** – The library for web and native user interfaces
- **[Tailwind CSS 4](https://tailwindcss.com/)** – Utility-first CSS framework
- **[Iconify](https://iconify.design/)** – Unified Open Source Icons

---

## ✨ Features

- ⚡ **Hot Module Replacement (HMR)** for both Renderer and Main processes
- 🎨 **Tailwind CSS v4** configured with `@tailwindcss/vite`
- 🪟 **Custom Title Bar** & Window Controls (Minimize, Maximize, Close)
- � **Secure IPC Communication** (Context Isolation enabled)
- � **Electron Builder** ready for Windows packaging

---

## 📜 License

This project is licensed under the [MIT](LICENSE) license.
