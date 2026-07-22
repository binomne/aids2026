# HIVnext Global — AIDS2026 site

A small static site: homepage, a full-size zoomable virtual poster viewer, and
the accepted abstract. Built with plain HTML + Tailwind (via CDN) + a little
vanilla JS — no build step, so it deploys straight to GitHub Pages.

```
index.html          Homepage
poster.html          Virtual poster viewer (pan/zoom + download)
abstract.html        Accepted abstract, formatted for reading & printing
assets/
  css/site.css        All shared styles + the light/dark theme system
  js/config.js         ← THE FILE YOU EDIT to change logos, links, CTA
  js/site.js            Renders nav/footer, theme toggle, page transitions
  js/poster-viewer.js   Pan/zoom controller for the poster page
  logos/                Your logo files
  favicon/              Tab icon (generated from Emblem-vector.svg)
  poster/                Poster PDF + web-optimised images
```

---

## 1. Deploy it to GitHub Pages (5 minutes)

1. Create a new repository on GitHub (public, so Pages can serve it for free).
2. Push this whole folder to it:
   ```bash
   cd aids2026-site
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**. Under "Build and deployment", set
   **Source: Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. Wait ~1 minute, then your site is live at:
   `https://<your-username>.github.io/<your-repo>/`

**A note on repo size:** the original poster PDF (`assets/poster/poster-original.pdf`)
is ~31 MB. That's fine for a normal `git push` (GitHub's hard limit is 100 MB
per file), but if you'd rather keep the repo lightweight, you can:
- delete it and only keep `poster-web.jpg` (the viewer doesn't need the PDF —
  only the "Download original PDF" button does), or
- use [Git LFS](https://git-lfs.com) for that one file, or
- host the PDF elsewhere (Google Drive, Dropbox) and point
  `SITE_CONFIG.poster.pdf` in `config.js` at that URL instead.

---

## 2. Point aids2026.hivnext.org at it (custom domain)

A `CNAME` file (containing `aids2026.hivnext.org`) is already included at the
repo root, and canonical/`og:url` tags in all three pages already point at
that domain — so the code side is done. Two things left, both outside this
repo:

**A. Add a DNS record.** Log into wherever `hivnext.org`'s DNS is managed
(your registrar, or Cloudflare/Route 53/etc. if you use one) and add:

| Type  | Host/Name | Value |
|-------|-----------|-------|
| CNAME | `aids2026` | `<your-username>.github.io` |

(Use your GitHub username or org name — *not* the repo name — as the value.
DNS changes can take anywhere from a few minutes to a few hours to propagate.)

**B. Tell GitHub Pages about it.** Repo → **Settings → Pages** → under
"Custom domain," enter `aids2026.hivnext.org` → Save. Once DNS has
propagated, GitHub auto-provisions an HTTPS certificate (can take up to ~24h
the first time) — come back and tick **Enforce HTTPS** once that checkbox
becomes available.

Once both are done, `https://aids2026.hivnext.org` is your live site — that's
the URL to put in your QR code.

---

## 3. Generate your QR code

Once your Pages URL is live (custom domain or the default `github.io` one —
whichever resolves first), generate a QR code pointing at it. Any QR
generator works — [qr-code-generator.com](https://www.qr-code-generator.com)
or [qrcode.tec-it.com](https://qrcode.tec-it.com) are both free and need no
account. Test it by scanning with your own phone before printing the poster.

---

## 4. Everyday edits — `assets/js/config.js`

This is the one file you'll come back to. It's heavily commented. In short:

- **Header logo** — `headerLogo.srcDark` / `headerLogo.srcLight`: swap these
  paths to use your own logo. Provide a light-coloured version (for dark
  theme) and dark-coloured version (for light theme) so the wordmark stays
  readable when someone toggles the theme.
- **Footer logos** — `footerLogos`: an array. Every object in it renders as a
  logo in the footer automatically, in order. To add your NGO/company logo,
  drop the image file into `assets/logos/`, then add a new object to the
  array pointing at it (copy an existing entry as a template).
- **Book a demo** — `demoBookingUrl`: point this at a `mailto:`, a
  Calendly/Cal.com link, or a contact form. Every "Book a demo" button on
  every page reads from this one value.
- **Poster metadata** — `poster.title` / `poster.authors` / `poster.session`:
  shown on the poster and abstract pages.

After editing `config.js`, just refresh the page — no build step, no
compiling.

---

## 5. Things worth checking before you publish

- **`abstract.html` wording** — the abstract text was reconstructed from the
  content and figures visible on your poster PDF, since no separate abstract
  manuscript was supplied. Please compare it against your officially
  submitted IAS abstract and edit `abstract.html` if the exact wording
  differs (there's an HTML comment near the top of the file marking exactly
  what to check).
- **Testimonial quotes** on the homepage are placeholders carried over from
  the original draft (marked with a `⚠️ PLACEHOLDER` comment in `index.html`)
  — replace with real, approved quotes before the conference.
- **`hivnext.org`** is linked from the final CTA section — update or remove
  if that domain isn't live yet.

---

## 6. Local preview

No build step needed — but opening `index.html` directly via `file://` will
block the fetch-free parts fine, though it's better to serve it locally so
paths behave exactly like production:

```bash
cd aids2026-site
python3 -m http.server 8000
# open http://localhost:8000
```

---

## 7. Browser support notes

- The theme toggle uses `localStorage` + `prefers-color-scheme`, and the nav
  bar's blur tint uses CSS `color-mix()` — both work in all current browsers
  (evergreen Chrome/Safari/Firefox/Edge, iOS Safari, Android Chrome).
- The poster pan/zoom uses the Pointer Events API (unifies mouse + touch),
  supported everywhere modern.
- Reduced-motion preference is respected throughout — animations are skipped
  automatically for visitors with that OS setting enabled.
