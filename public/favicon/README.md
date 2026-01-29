# Favicon assets

**Main favicon:** The site uses **logo_white.png** as the favicon via Next.js file convention:
- `app/icon.png` — browser tab favicon (copy of `public/logos/logo_white.png`)
- `app/apple-icon.png` — Apple touch icon (same logo)

To update the favicon, replace `app/icon.png` and `app/apple-icon.png` with new copies from `public/logos/logo_white.png` (or your updated logo).

This folder (`public/favicon/`) is used for:
- **PWA / Android:** `site.webmanifest` references the android-icon-*.png files for "Add to Home Screen".
- **Windows:** `browserconfig.xml` and ms-icon-*.png for tile and start menu.

To regenerate the PNGs in this folder from the logo (e.g. for PWA icons), use [realfavicongenerator.net](https://realfavicongenerator.net/) or [favicon.io](https://favicon.io/) with `../logos/logo_white.png`, then overwrite the `.png` files here (keep `site.webmanifest`, `browserconfig.xml`, and this README).
