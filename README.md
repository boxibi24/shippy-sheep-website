# Shippy Sheep Studio — website

The marketing website for **Shippy Sheep Studio**, a low-poly game & real-time 3D studio.

It's a single self-contained `index.html` — plain HTML, CSS, and vanilla JS, with **no build
step**. Markup is generated at runtime by hand-rolled template functions, the scenery and sheep
are procedurally drawn as SVG (seeded so output is deterministic), and there's a tweak panel for
switching between three visual themes.

## Run it

It's a static file, but serve it over HTTP rather than opening `file://` directly (otherwise the
CDN fonts/icons and the `localStorage`-backed tweak panel won't behave):

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Any static server works (`npx serve`, the VS Code Live Server extension, etc.).

## Structure

| Path             | What it is                                                            |
| ---------------- | --------------------------------------------------------------------- |
| `index.html`     | The entire website — markup, CSS, and JS in one file                  |
| `favicon.svg`    | Helm + faceted-sheep brand mark                                       |
| `project/`       | Reference: the original React/JSX design prototype + assets (not shipped) |
| `chats/`         | Reference: the Claude Design transcript this was built from           |
| `DESIGN-README.md` | The original design-export README                                   |

## Dependencies

CDN-only at runtime: [Google Fonts](https://fonts.google.com) and [Lucide](https://lucide.dev)
icons. Everything else is inlined or local.
