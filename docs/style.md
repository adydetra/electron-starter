# Style & Design System

The application uses Tailwind CSS v4 powered by `@tailwindcss/vite` in the React renderer.

## Desktop Styling Rules

Desktop interfaces differ from standard web pages in interaction and windowing behavior:

- **Window Dragging**: The custom top bar (`TopBar.jsx`) uses `-webkit-app-region: drag` so users can click and drag the frameless window.
- **No-Drag Controls**: Interactive buttons inside draggable areas (like `WindowControls.jsx`) must specify `-webkit-app-region: no-drag` or `pointer-events: auto`.
- **Text Selection**: General UI elements should be non-selectable (`select-none` in Tailwind) to maintain native application feel.
- **Window Controls Styling**: Minimize, maximize, and close buttons follow desktop platform visual guidelines.
