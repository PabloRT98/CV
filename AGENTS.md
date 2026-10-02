# CV Project — Agent Instructions

Personal CV/portfolio website for Pablo Ripoll Torrejón. Single-page static site with bilingual support (English/Spanish), plain HTML + CSS + vanilla JS (no frameworks, no jQuery).

## Project Structure

| Path | Purpose |
|---|---|
| `index.html` | Entire site — single HTML file |
| `css/style.css` | All styles (CSS variables, light/dark themes, responsive) |
| `js/main.js` | Theme toggle, mobile menu, reveal-on-scroll, active nav link |
| `js/translate.js` | i18n language switcher logic |
| `langs/en.json` | English translation strings |
| `langs/es.json` | Spanish translation strings |
| `docs/cv_en.pdf` / `docs/cv_es.pdf` | Downloadable CV PDFs |
| `images/` | Logos, certification badges and photos (`profile.jpg` is the hero portrait, cropped from `pablete_2.jpg`) |

`linkedin/` holds the banner and the copy-paste texts used to keep the LinkedIn profile in sync with the CV (not part of the site).

## No Build System

There is no build step. Edit files directly. Because `translate.js` uses `fetch`, serve the folder over HTTP to preview (`python -m http.server`, or the `cv-web` entry in `.claude/launch.json`); opening `index.html` from `file://` will not load the translations.

## i18n / Translation System

All visible text is driven by `data-translate` attributes. `js/translate.js` loads the active language JSON and sets `innerHTML` on every `[data-translate]` element. Attributes can be translated with `data-translate-attr="attribute:key"` (comma-separated for several). It also updates `<html lang>`, the page title, the meta description and the CV download link (`cv_pdf_link`), and remembers the choice in `localStorage`.

**Rules:**
- Any new text element in `index.html` must use `data-translate="key"` instead of hardcoded text (technology names and proper nouns may stay literal)
- Every new key must be added to **both** `langs/en.json` and `langs/es.json`
- Key names use `snake_case`
- HTML is allowed inside translation values (e.g. `<b>`, `<a>`, `<li>`)
- Default language on load is **Spanish** (`currentLang = 'es'`)
- Keep the two JSON files in sync: same keys, same order

Example:
```html
<h3 data-translate="my_new_key"></h3>
```
```json
// langs/en.json
"my_new_key": "My New Section"

// langs/es.json
"my_new_key": "Mi Nueva Sección"
```

## HTML Conventions

### Page sections
Each section is `<section id="..." class="section">` (add `alt` for the tinted background). Ids double as nav anchors: `#about`, `#experience`, `#education`, `#skills`, `#certs`, `#projects`, `#contact`. The hero has no id.

### Scroll animations
Add `class="reveal"` to any block that should fade in on scroll (handled by an `IntersectionObserver` in `main.js`; disabled with `prefers-reduced-motion`).

### Timeline items (Experience / Education)
```html
<li class="reveal">
  <img class="logo" src="images/company.png" width="48" height="48" alt="Company">
  <div class="card">
    <h3 data-translate="workN_title"></h3>
    <p class="meta"><span>Company</span> · <span data-translate="workN_time"></span></p>
    <ul class="bullets" data-translate="workN_bullets"></ul> <!-- value is a string of <li> items -->
  </div>
</li>
```
Newest first. Keys are numbered `work5` (current) down to `work1` (oldest).

### Skills
Each group is a `.skill-group` with an `<h3>` (translated) and a `<ul class="chips">`. Add `class="strong"` to a chip to highlight a specialty. Skill levels are no longer shown.

### Theming
Colors are CSS variables in `:root`; dark values live under `@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]`. The `<head>` applies the saved theme before first paint.

## Facts to keep consistent
The PDFs in `docs/`, the JSON strings and the LinkedIn profile should agree on dates, titles and certifications. Current source of truth: Technical Manager at Servinform since January 2026; RPA Analyst January 2023 – January 2026; RPA Developer September 2021 – January 2023; ITURRI Software Engineer April – September 2021 and intern October 2020 – April 2021; degree finished March 2021. The "5+ years" figure in the hero and the "Last update" string in the footer must be revisited when updating.
