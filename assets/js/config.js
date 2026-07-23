/* ============================================================================
   HIVnext — SITE CONFIG
   ----------------------------------------------------------------------------
   Shared branding, links, and conference assets used across the static site.
   ============================================================================ */

window.SITE_CONFIG = {

  siteName: "HIVnext",
  siteTagline: "Built by Community, for Community",

  // Header wordmark. The theme-aware pair keeps it readable in both modes.
  headerLogo: {
    srcDark: "assets/logos/hivnext-logo-dark-bg.svg",
    srcLight: "assets/logos/hivnext-logo-light-bg.svg",
    alt: "HIVnext",
    href: "index.html"
  },

  // Footer identity: MAF/MAC initiative lock-up on the left, HIVnext wordmark
  // on the right. The wordmark swaps automatically with the theme.
  footerInitiative: {
    logo: "assets/logos/mafmac.svg",
    alt: "Malaysian AIDS Foundation and Malaysian AIDS Council",
    label: "An initiative by M&E, MAF/MAC"
  },

  footerWordmark: {
    srcDark: "assets/logos/hivnext-wordmark-on-dark.svg",
    srcLight: "assets/logos/hivnext-wordmark-on-light.svg",
    alt: "HIVnext",
    href: "index.html"
  },

  // Main call to action.
  demoBookingUrl: "mailto:hivnext@myaids.org.my?subject=HIVnext%20Demo%20Request%20—%20AIDS2026",
  demoButtonLabel: "Book a demo →",

  // Approved IAS-AIDS 2026 poster assets. The version query forces browsers
  // and CDNs to replace any cached older poster and author render.
  poster: {
    title: "Leveraging Integrated Digital Health Systems to Reduce Community Health Worker Reporting Burden and Strengthen Differentiated HIV Service Delivery in Malaysia",
    authors: "B.A.H. Ibnu Najah, T.T.T. Andrew",
    session: "AIDS2026 · Abstract 9598 · Presented at the 26th International AIDS Conference",
    pdf: "assets/poster/poster-original.pdf?v=ias-aids-2026-ttt-andrew-20260723",
    image: "assets/poster/poster-web.jpg?v=ias-aids-2026-ttt-andrew-20260723",
    thumbnail: "assets/poster/poster-thumb.jpg?v=ias-aids-2026-ttt-andrew-20260723",
    placeholder: "assets/poster/poster-placeholder.jpg?v=ias-aids-2026-ttt-andrew-20260723"
  },

  // Official two-page IAS abstract. The public page shows faithful page
  // renders and intentionally exposes no download or print control.
  abstract: {
    id: "9598",
    source: "assets/abstract/official-abstract-9598.pdf?v=abstract-authors-ttt-andrew-20260723",
    pageOne: "assets/abstract/abstract-page-1.webp?v=abstract-authors-ttt-andrew-20260723",
    pageTwo: "assets/abstract/abstract-page-2.webp?v=abstract-authors-ttt-andrew-20260723"
  },

  contactEmail: "hivnext@myaids.org.my",
  contactNote: "Malaysian AIDS Foundation / Malaysian AIDS Council"
};
