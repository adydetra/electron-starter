# Agent Guide

Modern desktop application starter built with Electron 43, React 19, Vite 8, and Tailwind CSS v4.

Read only the document needed:
- `docs/architecture.md`: dual-process model (Main vs Preload vs Renderer), IPC window controls, and React hierarchy.
- `docs/style.md`: Tailwind CSS v4, frameless window drag regions (`-webkit-app-region`), and desktop UI conventions.
- `docs/testing.md`: concurrent dev commands, renderer build, Windows installer packaging (`build:win`), and linting.
- `docs/push.md`: branch naming, commit standards, pull request lifecycle, and pre-push validation.
- `docs/status.md`: implemented features, electron-builder packaging config, and roadmap.

## Source Map

- `electron/main.cjs`: Electron main process, BrowserWindow instantiation, IPC handlers for window minimize/maximize/close, and app lifecycle.
- `electron/preload.cjs`: secure preload script bridging IPC handlers to the renderer window context safely.
- `src/main.jsx`: React 19 root render mounting into DOM.
- `src/App.jsx`: root desktop UI shell and content view.
- `src/components/organisms/TopBar.jsx`: custom draggable frameless titlebar with window controls.
- `src/components/molecules/WindowControls.jsx`: minimize, maximize, and close action buttons.
- `src/components/atoms/IconButton.jsx`: reusable atomic icon button component.
- `src/index.css`: Tailwind CSS v4 styles and desktop-specific CSS rules (non-selectable text, app regions).
- `config.json`: application runtime metadata and configurations.
- `build/`: Windows installer graphics, icon assets, and NSIS configuration script (`installer.nsh`).
- `package.json`: build configurations (`electron-builder`), scripts, and dependencies.

## Invariants

- Preserve the security boundary: never enable `nodeIntegration: true` or disable `contextIsolation`. Always communicate between renderer and main process via `electron/preload.cjs`.
- Custom window titlebar (`TopBar.jsx`) must define `-webkit-app-region: drag`, while clickable controls within it must explicitly specify `-webkit-app-region: no-drag`.
- Use React 19 functional components with hooks. Manage global UI state with Zustand (`zustand`).
- Style desktop components with Tailwind CSS v4 utilities. Avoid native browser styling like text selection on UI frames (`user-select: none`).
- Code formatting and linting must adhere to ESLint flat configuration (`bun run lint`).

## Change Workflow

Read `package.json` before altering dependencies, build targets, or installer scripts. Run `bun run lint` and `bun run build:renderer` before committing changes. Follow `docs/push.md` for git conventions, and keep `docs/` updated if architectural invariants change.
