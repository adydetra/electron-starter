# Development & Quality Assurance

Commands and workflows for running, building, linting, and packaging the Electron app.

## Commands

```bash
# Run Vite renderer and Electron concurrently in development
bun run dev

# Run only Vite dev server (for browser testing)
bun run dev:vite

# Run Electron against already-running Vite server
bun run dev:electron

# Run ESLint validation
bun run lint

# Build Vite frontend renderer
bun run build:renderer

# Build Windows NSIS installer
bun run build:win
```

## Quality Checklist

Before opening a pull request or pushing commits:
1. Ensure `bun run lint` passes without errors.
2. Verify `bun run build:renderer` compiles cleanly into `dist/`.
3. If changing Electron main process or installer configuration, verify `bun run build:win` packages the installer without errors.
