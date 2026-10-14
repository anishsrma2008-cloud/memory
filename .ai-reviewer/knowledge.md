# nexus-workspace reviewer notes

## Architecture

Nexus Workspace is a Vite-powered React single-page dashboard, with the application entry point in `src/main.jsx` and nearly all UI, state, mock data, and interaction logic consolidated in `src/App.jsx`. Styling is centralized in `src/styles.css`, while `lucide-react` supplies interface icons. The app is currently a client-side prototype with static project/activity data and local React state rather than a backend or routing layer.

## Conventions

- Use functional React components and hooks. `src/App.jsx` uses `useState` for UI state and `useMemo` for derived project filtering.
- Keep static dashboard data near the top of `src/App.jsx` in arrays such as `navItems`, `projects`, `activity`, and `weekly`.
- Reusable visual primitives are local components in `src/App.jsx`, including `Avatar` and `ProgressBar`; prefer extending these rather than duplicating markup.
- Use `lucide-react` components for icons, imported at the top of `src/App.jsx`; avoid introducing ad hoc SVGs for standard interface icons.
- Use semantic HTML where the existing UI does: navigation buttons, `<table>` for project rows, `<label>` wrappers for form controls, and `aria-label` for icon-only notification controls.
- CSS styling is class-based and centralized in `src/styles.css`; dynamic visual values are passed as inline styles only where data drives them, such as progress widths and sparkline heights.
- State-driven styling follows explicit class names, for example `active`, `selected`, `risk`, and `small`, rather than separate component libraries or CSS-in-JS.
- Keep the project compatible with the existing Vite scripts in `package.json`: `npm run dev`, `npm run build`, and `npm run preview`.

## Intentional non-standard choices

- `src/App.jsx` is intentionally a single large dashboard component with colocated mock data and small presentational components; do not flag this as a missing feature-module architecture for routine UI changes.
- Most controls are prototype interactions backed by local state and toast messages. For example, “Create project” closes the modal and reports `"Project draft created"` but does not persist a project.
- Dashboard values, dates, avatars, teams, and activity entries are static sample content in `src/App.jsx`, not expected to come from an API.
- The displayed date (`Tuesday, October 14, 2026`) is hard-coded as product mock content, not runtime date logic.

## Watch out for

- Do not break the filtering contract in `visibleProjects`: search must cover project name, type, and owner, while filters must continue recognizing the exact statuses `"On track"` and `"At risk"`.
- Preserve stable list keys. Projects use `project.name`, activities use `item.person + item.subject`, and sparkline bars use their index; changing these carelessly can cause React rendering issues.
- New interactive controls should update local state or use the existing `notify` helper; avoid adding buttons that appear functional but have no handler.
- Be careful with modal backdrop handling: the outer `.modal-backdrop` closes the modal, while the inner `.modal` stops propagation so clicks inside do not dismiss it.
- Avoid adding dependencies or changing module conventions without need; `package.json` uses ES modules (`"type": "module"`) and currently has no test framework.