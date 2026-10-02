# Architecture

High-performance desktop application built with Electron 43, React 19, Vite 8, and Tailwind CSS v4.

## Dual-Process Model & IPC Security

This application enforces Electron's recommended security architecture separating the main Node.js process from the frontend Chromium renderer:

```text
Main Process (Node.js)
  └── electron/main.cjs (Lifecycle, BrowserWindow, native OS APIs)
        │
        ├── IPC Channel via Context Bridge
        │
Preload Script (Isolated Context)
  └── electron/preload.cjs (Exposes window.electronAPI safely)
        │
Renderer Process (Chromium / React 19)
  ├── src/main.jsx (Mount point)
  └── src/App.jsx (React UI)
        ├── src/components/organisms/TopBar.jsx (Draggable titlebar)
        │     └── src/components/molecules/WindowControls.jsx (Min / Max / Close)
        │           └── src/components/atoms/IconButton.jsx (Icon buttons)
```

## Security Best Practices

- `contextIsolation: true`: Isolates preload scripts and internal Electron APIs from renderer scripts.
- `nodeIntegration: false`: Prevents renderer scripts from accessing raw Node.js runtime.
- **IPC Protocol**: All window actions (`minimize`, `maximize`, `close`) use `ipcRenderer.send()` mapped in `preload.cjs` and handled in `main.cjs` via `ipcMain.on()`.

## Packaging Pipeline

- **Renderer Build**: Bundled using Vite 8 (`bun run build:renderer`) into `dist/`.
- **Desktop Packaging**: Packaged via `electron-builder` into standalone Windows NSIS installers (`bun run build:win`).
