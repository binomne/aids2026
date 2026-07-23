/* ============================================================================
   HIVnext Global — SITE CONFIG
   ----------------------------------------------------------------------------
   This is the ONLY file you should need to touch to rebrand or update
   links across the whole site. Every page reads from window.SITE_CONFIG.

   To add a new logo to the footer: copy one of the objects inside
   `footerLogos` below, paste it as a new line, and point `src` at your own
   image (SVG, PNG, or JPG all work — drop the file into assets/logos/ first).
   ============================================================================ */

window.SITE_CONFIG = {

  siteName: "HIVnext Global",
  siteTagline: "Built by Community, for Community",

  // ---------------------------------------------------------------------
  // HEADER LOGO
  // Shown top-left on every page. Provide a light-coloured version (for
  // dark theme) and a dark-coloured version (for light theme) so the
  // wordmark stays legible when a visitor toggles the theme switch.
  // Swap the file paths below to use your own logo — just replace the
  // files in assets/logos/ or point these at new filenames.
  // ---------------------------------------------------------------------
  headerLogo: {
    srcDark: "assets/logos/hivnext-logo-dark-bg.svg",   // used when theme = dark
    srcLight: "assets/logos/hivnext-logo-light-bg.svg", // used when theme = light
    alt: "HIVnext Global",
    href: "index.html"
  },

  // ---------------------------------------------------------------------
  // FOOTER LOGOS
  // Every object in this array renders automatically as a logo in the
  // footer strip, in order. Add your own NGO / company / partner logos
  // here so conference visitors know who built this. `srcLight` is
  // optional — omit it if your logo already works fine on both themes
  // (e.g. it has a transparent background and readable colours).
  // ---------------------------------------------------------------------
  footerLogos: [
    {
      srcDark: "assets/logos/hivnext-logo-dark-bg.svg",
      srcLight: "assets/logos/hivnext-logo-light-bg.svg",
      alt: "HIVnext Global",
      href: "index.html"
    },
    {
      srcDark: "assets/logos/emblem.svg",
      srcLight: "assets/logos/emblem.svg",
      alt: "AIDS2026 — 26th International AIDS Conference",
      href: "https://www.iasociety.org"
    }
    // 👉 Add your own logo(s) here, for example:
    // {
    //   srcDark: "assets/logos/your-ngo-logo.svg",
    //   srcLight: "assets/logos/your-ngo-logo.svg",
    //   alt: "Your NGO Name",
    //   href: "https://your-ngo-website.org"
    // },
  ],

  // ---------------------------------------------------------------------
  // CALL TO ACTION — "Book a demo"
  // Point this at whatever you want visitors to do: a mailto link (default),
  // a Calendly / Cal.com booking page, or a contact form URL.
  // ---------------------------------------------------------------------
  demoBookingUrl: "mailto:hivnext@myaids.org.my?subject=HIVnext%20Demo%20Request%20—%20AIDS2026",
  demoButtonLabel: "Book a demo →",

  // ---------------------------------------------------------------------
  // POSTER (virtual poster viewer page)
  // ---------------------------------------------------------------------
  poster: {
    title: "Leveraging Integrated Digital Health Systems to Reduce Community Health Worker Reporting Burden and Strengthen Differentiated HIV Service Delivery in Malaysia",
    authors: "B.A.H. Ibnu Najah, B.Y. Md Yusralhakim",
    session: "AIDS2026 · Abstract THPEE537 · Presented at the 26th International AIDS Conference",
    pdf: "assets/poster/poster-original.pdf",         // full-resolution original — linked as a direct download
    image: "assets/poster/poster-web.jpg",             // web-optimised render used in the on-page zoom/pan viewer
    placeholder: "assets/poster/poster-placeholder.jpg" // tiny blurred image shown while the full poster loads
  },

  // ---------------------------------------------------------------------
  // CONTACT (shown in footer)
  // ---------------------------------------------------------------------
  contactEmail: "hivnext@myaids.org.my",
  contactNote: "Malaysian AIDS Foundation / Malaysian AIDS Council"
};
