# Shippy Sheep Studio — website

The marketing website for **Shippy Sheep Studio**, a low-poly game & real-time 3D studio.

**Live:** https://boxibi24.github.io/shippy-sheep-website/

It's a single self-contained `index.html` — plain HTML, CSS, and vanilla JS, with **no build
step**. Markup is generated at runtime by hand-rolled template functions, the scenery, sheep, and
portfolio/avatar art are procedurally drawn as SVG (seeded so output is deterministic), and there's
a tweak panel for switching between three visual themes.

## Run it locally

It's a static file, but serve it over HTTP rather than opening `file://` directly (otherwise the
CDN fonts/icons and the `localStorage`-backed tweak panel won't behave):

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Any static server works (`npx serve`, the VS Code Live Server extension, etc.).

## Features

- **Three themes** (Pasture / Nightfall / Wool & Paper) via the on-page tweak panel; choices persist in `localStorage`.
- **Procedural low-poly art** fills the hero, portfolio cards, and team avatars — theme-aware, no image assets required (swap in real `<img>` later if you like).
- A **walking sheep flock** that wanders left/right across the page, plus the fluffy brand sheep.
- **Journal articles** and **Press kit / Careers / Privacy / Terms** open in an accessible modal reader (focus trap, `Esc`/scrim close, focus restore).
- **Contact form** wired to [Web3Forms](https://web3forms.com) with a `mailto:` fallback.
- SEO essentials: Open Graph / Twitter / JSON-LD, `sitemap.xml`, `robots.txt`, a custom `404.html`, and a generated `og-cover.png`.

## Contact form (Web3Forms)

The form posts to Web3Forms. Until a key is set it falls back to opening the visitor's email client.
To enable real inbox delivery, get a free access key at <https://web3forms.com> and set it in
`index.html`:

```js
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // ← paste your key here
```

## Hosting / deploy

Hosted on **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`). On every push to
`main`, the workflow assembles only the site files into `_site/` (excluding `project/` and `chats/`)
and deploys. The repo's **Settings → Pages → Source** must be set to **GitHub Actions**.

## Structure

| Path                       | What it is                                                                |
| -------------------------- | ------------------------------------------------------------------------- |
| `index.html`               | The entire website — markup, CSS, and JS in one file                      |
| `favicon.svg`              | Helm + fluffy-sheep brand mark                                            |
| `og-cover.png`             | 1200×630 social preview image                                             |
| `404.html`                 | Custom not-found page                                                     |
| `robots.txt`, `sitemap.xml`| SEO crawl files                                                           |
| `.github/workflows/`       | GitHub Pages deploy workflow                                              |
| `project/`                 | Reference: the original React/JSX design prototype + assets (not shipped) |
| `chats/`                   | Reference: the Claude Design transcript this was built from               |
| `DESIGN-README.md`         | The original design-export README                                         |

## Dependencies

CDN-only at runtime: [Google Fonts](https://fonts.google.com) and [Lucide](https://lucide.dev)
icons. Everything else is inlined or local.
