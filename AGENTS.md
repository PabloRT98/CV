# CV Project — Agent Instructions

Personal CV/portfolio website for Pablo Ripoll Torrejón. Single-page static site with bilingual support (English/Spanish).

## Project Structure

| Path | Purpose |
|---|---|
| `index.html` | Entire site — single HTML file |
| `css/style.css` | Custom styles (source: `sass/style.scss`) |
| `js/main.js` | Animations, parallax, scroll behavior (jQuery) |
| `js/translate.js` | i18n language switcher logic |
| `langs/en.json` | English translation strings |
| `langs/es.json` | Spanish translation strings |
| `docs/cv_en.pdf` / `docs/cv_es.pdf` | Downloadable CV PDFs |
| `images/` | All photos, icons, logos |

## No Build System

There is no build step. Edit files directly:
- CSS: edit `css/style.css` (or `sass/style.scss` if using Sass manually)
- JS: edit `js/main.js` or `js/translate.js`
- Open `index.html` directly in a browser to preview

## i18n / Translation System

All visible text is driven by `data-translate` attributes. The `js/translate.js` script loads the active language JSON and sets `innerHTML` on every `[data-translate]` element.

**Rules:**
- Any new text element in `index.html` must use `data-translate="key"` instead of hardcoded text
- Every new key must be added to **both** `langs/en.json` and `langs/es.json`
- Key names use `snake_case`
- HTML is allowed inside translation values (e.g. `<b>`, `<a>`)
- Default language on load is **Spanish** (`current_lang_index = 1`)

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
Sections use `id="fh5co-*"`:
- `#fh5co-header` — Hero header
- `#fh5co-about` — About me
- `#fh5co-resume` — Timeline (experience + training)
- `#fh5co-features` — Soft skills/competences
- `#fh5co-work` — Professional skills (carousel)

### Scroll animations
Add `class="animate-box"` to any block that should animate in on scroll. Control effect with `data-animate-effect`:
```html
<div class="animate-box" data-animate-effect="fadeIn">...</div>
<!-- values: fadeIn | fadeInLeft | fadeInRight -->
```

### Timeline items (Resume section)
Alternate between `.timeline-unverted` and `.timeline-inverted` for left/right layout:
```html
<li class="animate-box timeline-unverted"> <!-- odd items -->
<li class="timeline-inverted animate-box"> <!-- even items -->
```
Each item must have:
- `<div class="timeline-badge">` with an icon
- `<div class="timeline-panel">` with `.timeline-heading` and `.timeline-body`
- `data-translate` attributes on title, date, and description

### Skills carousel (Professional skills section)
Skill cards follow this template:
```html
<div class="col-md-3 text-center col-padding animate-box">
  <div class="mt-5">
    <img src="images/tech-logo.png" class="same-size">
    <div class="text-center"><h4 class="tech-title">Tech Name</h4></div>
    <div class="span tech-subtitle" data-translate="level_1"></div>
    <!-- level keys: level_1 (Basic), level_2 (Intermediate), level_3 (Advanced) -->
  </div>
</div>
```
Each carousel slide is a `<div class="carousel-item">` inside `#carouselExampleControls`.

## Libraries (vendored — do not update)

- Bootstrap 3/4 (`css/bootstrap.css`, `js/bootstrap.min.js`)
- jQuery (`js/jquery.min.js`)
- jQuery Stellar (parallax) — `js/jquery.stellar.min.js`
- jQuery Waypoints (scroll triggers) — `js/jquery.waypoints.min.js`
- Font Awesome 5 — `css/all.css`, `js/all.js`
- Icomoon icon font — `css/icomoon.css` (icons used: `icon-suitcase`, `icon-graduation-cap`)
- Animate.css — `css/animate.css`
