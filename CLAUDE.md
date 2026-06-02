# SS-studio

> Project workspace initialized for use with Claude Code. This file is loaded into
> context at the start of every session — keep it short, current, and high-signal.

## What this is

The marketing website for **Shippy Sheep Studio** — a (fictional) game & real-time 3D
studio. The site is a single self-contained `index.html`: a low-poly themed landing page
with a **light/dark mode** toggle (light = "Wool & Paper", dark = "Nightfall"),
procedurally-generated SVG scenery, an interactive **sheep-herding minigame** (a flock that
follows the cursor and runs to eat food you drop with a click), and all the usual marketing
sections (hero, services, portfolio, stats, mission, team, journal, contact).

## Stack

- **Plain HTML + CSS + vanilla JS** — no framework, no build step, no bundler.
- All markup is generated at runtime by hand-rolled JS template functions (`render()`),
  not React. The original Claude Design prototype was React/JSX; it was ported to vanilla.
- **CDN-only dependencies:** Google Fonts and [Lucide](https://lucide.dev) icons. Everything
  else (CSS, JS, procedural SVG, favicon) is inlined or local.

## Layout

```
.
├── .claude/        # Claude Code project config (settings, etc.)
├── index.html      # The entire website — markup, CSS, and JS in one file
├── favicon.svg     # Helm + faceted-sheep brand mark
├── project/        # Reference: original React/JSX design prototype + assets (not shipped)
├── chats/          # Reference: the Claude Design transcript this was built from
├── DESIGN-README.md# Reference: the original design-export README
├── CLAUDE.md       # This file
└── .gitignore
```

## Commands

No build/test/lint tooling — it's a static file. Just serve it over HTTP (don't open the
`file://` directly, or the CDN fonts/icons and `localStorage` mode persistence misbehave).

| Task  | Command                                              |
| ----- | ---------------------------------------------------- |
| Run   | `python -m http.server 8000` → http://localhost:8000 |
| Build | _none — static `index.html`_                         |
| Test  | _none_                                               |
| Lint  | _none_                                               |

## Conventions

- Keep everything in the single `index.html`. Sections are built by small `XxxSection()`-style
  functions that return HTML strings; `render()` assembles them and re-runs on mode changes.
- Procedural SVG (low-poly scenery, sheep) uses a seeded PRNG (`mulberry32`) so output is
  deterministic — don't introduce `Math.random()` in render paths. (The minigame physics is
  *not* a render path; it uses `Math.random()` freely for spawn jitter and motion.)
- Two colour modes via `data-direction` on `<html>` (`paper` = light, `nightfall` = dark) +
  CSS custom properties; the light/dark switch persists to `localStorage` (`shippy-mode`), and
  an inline `<head>` script applies the stored/OS preference before first paint. Density is
  locked to `comfy` and the hero to the `split` (scene-split) layout.
- The flock minigame is mounted on `<body>` (outside `#root`) so it survives `render()`
  re-renders; it tracks the cursor in viewport coordinates and drops food on background clicks
  (real UI clicks and open modals are excluded).

## Notes for Claude

- `project/` and `chats/` are reference/provenance only — the shipped artifact is `index.html`.
- Keep the **Stack**, **Layout**, and **Commands** sections above accurate as the site evolves.
