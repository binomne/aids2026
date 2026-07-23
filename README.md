# HIVnext - AIDS2026 site

A static conference microsite for HIVnext, including the homepage, interactive
virtual poster, official AIDS2026 abstract 9598, and a tailored demo-request
form. It uses plain HTML, Tailwind via CDN, GSAP on the homepage, and vanilla
JavaScript. There is no build step.

```text
index.html                    Homepage
poster.html                   Zoomable virtual-poster viewer
abstract.html                 Official two-page abstract viewer
demo.html                     Hands-on demo request form
demo-thank-you.html           Confirmation page after a successful request
assets/
  abstract/                   Official PDF plus page-render images
  css/site.css                Shared styles and light/dark theme system
  js/config.js                Shared branding, links, and asset paths
  js/site.js                  Header, footer, theme, and page transitions
  js/demo-form.js             Form counters, metadata, and submit-state logic
  js/poster-viewer.js         Poster pan/zoom controls
  logos/                      HIVnext and MAF/MAC identity assets
  poster/                     Approved poster PDF and web image variants
```

## Content included in this revision

- The latest QR-enabled IAS-AIDS 2026 poster is used by the homepage preview
  and the Virtual Poster page. Its PDF, web image, thumbnail, and placeholder
  were regenerated together, with versioned paths to invalidate older caches.
- HIVnext is expanded on the homepage as **Health Information Vault**, with an
  animated acronym treatment and explanatory copy for the NGO-focused cloud
  database and program-management system.
- National deployment figures and all three "From the Field" testimonials have
  been updated.
- The AIDS2026 callout uses `assets/logos/emblem.svg`.
- The footer uses the MAF/MAC initiative lock-up on the left, without a
  background card, and the theme-aware HIVnext wordmark on the right.
- The poster and abstract bylines read **B.A.H. Ibnu Najah, T.T.T. Andrew**.
  The revised two-page abstract PDF and its page renders were updated together.
  No abstract download or print control is exposed in the public interface.
- Every "Book a demo" call to action now opens `demo.html` instead of launching
  the visitor's local email application.

## Demo-request form delivery

The form is designed for a static host and posts to FormSubmit using a standard
HTML form submission. It deliberately does not use AJAX because FormSubmit's
submitter-copy feature relies on the standard form flow with its anti-spam
check enabled.

The routing in `demo.html` is:

- Primary recipient: `hivnext@myaids.org.my`
- CC recipient: `hivnext@mac.org.my`
- Submitter copy: enabled through the `_autoresponse` field and the required
  `email` input
- Success redirect: `demo-thank-you.html`

### Required one-time activation

Before public launch, deploy the site and submit one complete test request.
FormSubmit will send an activation message to `hivnext@myaids.org.my`. Open that
message and approve the form endpoint. The public form will not deliver normal
requests until that one-time confirmation is completed.

After activation, submit a second test and confirm all three deliveries:

1. The full request arrives at `hivnext@myaids.org.my`.
2. The same request is copied to `hivnext@mac.org.my`.
3. The test submitter receives the automatic submission copy.

Do not disable FormSubmit's default anti-spam check. Its automatic submitter
copy does not work when reCAPTCHA is disabled or when the form is converted to
AJAX submission.

The public consent text warns visitors not to include client-identifiable,
patient-level, or other sensitive case information. FormSubmit is an external
email-routing processor, so replace the form action with a first-party endpoint
later if organisational policy requires all request data to remain within
MAF/MAC-controlled infrastructure.

## Shared settings

Most global edits are made in `assets/js/config.js`:

- `headerLogo`: theme-aware header logo.
- `footerInitiative`: MAF/MAC logo and initiative wording.
- `footerWordmark`: theme-aware HIVnext footer wordmark.
- `demoBookingUrl`: destination used by all demo calls to action. It currently
  points to `demo.html`.
- `poster`: approved poster title, metadata, PDF, web image, thumbnail, and
  placeholder paths.
- `abstract`: official abstract ID, source PDF, and page-image paths.
- `contactEmail` and `contactNote`: footer contact details.

Form recipient settings are kept directly in `demo.html` because they are part
of the HTML form contract. Search for `formsubmit.co`, `_cc`, `_autoresponse`,
and `_next` to change them.

## Local preview

Serve the folder over HTTP so all relative paths behave as they will in
production:

```bash
cd aids2026-site
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

Do not send the form from a local preview unless you intend to trigger the live
FormSubmit activation or delivery flow. Visual and validation testing can be
done without pressing the final submit button.

## Deployment

The folder can be deployed directly to any static host, including GitHub Pages,
Cloudflare Pages, Netlify, or an existing web server. The included `CNAME`
contains `aids2026.hivnext.org`; keep it only when that host should serve the
custom domain.

The site loads Tailwind, GSAP, and Google Fonts from public CDNs, and the demo
form posts to FormSubmit. The production content security policy and network
must therefore allow those origins.

## Abstract-viewer note

The revised source file remains at
`assets/abstract/official-abstract-9598.pdf`. The public abstract page
intentionally renders the PDF as page images and does not provide a download or
print button. As with any content delivered to a browser, this is interface-level
deterrence rather than absolute file-access prevention.
