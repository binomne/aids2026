# HIVnext — AIDS2026 site

A static conference microsite for HIVnext, including the homepage, interactive
virtual poster, and official AIDS2026 abstract 9598. It uses plain HTML,
Tailwind via CDN, GSAP on the homepage, and vanilla JavaScript. There is no
build step.

```text
index.html             Homepage
poster.html             Zoomable virtual-poster viewer
abstract.html           Official two-page abstract viewer
assets/
  abstract/              Official PDF plus page-render images
  css/site.css           Shared styles and light/dark theme system
  js/config.js           Shared branding, links, and asset paths
  js/site.js             Header, footer, theme, and page transitions
  js/poster-viewer.js    Poster pan/zoom controls
  logos/                 HIVnext and MAF/MAC identity assets
  poster/                Approved poster PDF and web image variants
```

## Content included in this revision

- The latest QR-enabled IAS-AIDS 2026 poster is used by the homepage preview
  and the Virtual Poster page. Its PDF, web image, thumbnail, and placeholder
  were regenerated together, with versioned paths to invalidate older caches.
- HIVnext is expanded on the homepage as **Health Information Vault**, with an
  animated acronym treatment and explanatory copy for the NGO-focused cloud
  database and program-management system.
- National deployment figures and all three “From the Field” testimonials have
  been updated.
- The AIDS2026 callout uses `assets/logos/emblem.svg`.
- The footer uses the MAF/MAC initiative lock-up on the left, without a
  background card, and the new theme-aware HIVnext wordmark on the right.
- The poster and abstract bylines now read **B.A.H. Ibnu Najah, T.T.T. Andrew**.
  The revised two-page abstract PDF and its page renders were updated together.
  No abstract download or print control is exposed in the public interface.

## Shared settings

Most global edits are made in `assets/js/config.js`:

- `headerLogo`: theme-aware header logo.
- `footerInitiative`: MAF/MAC logo and initiative wording.
- `footerWordmark`: theme-aware HIVnext footer wordmark.
- `demoBookingUrl`: destination used by all demo calls to action.
- `poster`: approved poster title, metadata, PDF, web image, thumbnail, and
  placeholder paths.
- `abstract`: official abstract ID, source PDF, and page-image paths.
- `contactEmail` and `contactNote`: footer contact details.

## Local preview

Serve the folder over HTTP so all relative paths behave as they will in
production:

```bash
cd aids2026-site
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Deployment

The folder can be deployed directly to any static host, including GitHub Pages,
Cloudflare Pages, Netlify, or an existing web server. The included `CNAME`
contains `aids2026.hivnext.org`; keep it only when that host should serve the
custom domain.

The site loads Tailwind, GSAP, and Google Fonts from public CDNs, so its content
security policy and production network must allow those origins.

## Abstract-viewer note

The revised source file remains at
`assets/abstract/official-abstract-9598.pdf`. The public abstract page
intentionally renders the PDF as page images and does not provide
a download or print button. As with any content delivered to a browser, this is
interface-level deterrence rather than absolute file-access prevention.
