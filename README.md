# RAVEL — anonymous research homepage

A responsive, static project page for **RAVEL: A Spatial Coding Harness for Reasoning about Change and Preservation**.

## Preview locally

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080`. No build, package installation, API key, GPU, or backend is required. All image assets, figures, and PDFs are hosted locally; the page loads no analytics, remote fonts, or third-party scripts.

## Contents

- Three continuous, independently moving rows of real dataset images, with a pause control and reduced-motion support.
- Five physical-category tabs and a keyboard-accessible before/after comparison slider.
- Dataset overview, original execution-loop figure, and recorded trajectory examples.
- Four experiment views, transcribed from the supplied paper: full-cohort, matched controls, joint relation accuracy, and appearance robustness.
- Three resource links: Code (on-page release note), Data (on-page preview), and Paper (anonymous PDF). The full paper with supplementary material is linked in the code section.

## Edit

- `index.html`: text, figure descriptions, resource destinations.
- `style.css`: layout, colors, responsive styles, motion.
- `app.js`: category examples, filmstrip ordering, result values and protocol notes.
- `assets/manifest.json`: image and figure provenance, using anonymous episode identifiers.
- `assets/papers/`: anonymous paper PDFs with identity metadata removed.

When anonymous Code/Data release URLs are available, replace the corresponding hero links. Until then they intentionally link to local descriptions and previews rather than implying downloadable releases exist.

## Publish with GitHub Pages

The included workflow deploys the repository when `main` is pushed. In repository Settings → Pages, select **GitHub Actions** as the source. If Actions deployment is unavailable, the site also works with **Deploy from a branch → main → /(root)**.

## Anonymity

The page contains no author names, institutions, emails, personal filesystem paths, analytics, or author profile links. Git commits for this page use an anonymous identity. Hosting the repository under a personal account does not anonymize that account or the Pages hostname; a truly unlinkable review site needs a separate anonymous hosting identity.

## Evidence and attribution

All numerical values come from the supplied RAVEL manuscript. Full-cohort comparisons include additional geometry and state-wise calls for RAVEL; the matched 500-question table is shown separately. The dataset size follows the manuscript; this repository is a visual project page, not the full data release.

Composition references: [SolarRenderer](https://enderfga.cn/SolarRenderer/) (moving visual opening) and [Long-WAM](https://nvlabs.github.io/LongLive/Long-WAM/) (section hierarchy and experiment presentation). Website code and styling were written for this page; their videos, branding, and code are not copied.
