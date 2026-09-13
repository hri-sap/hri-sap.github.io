# Hrishav Sapkota

A quieter corner of the internet. A single-scroll personal website for projects,
notes, and the person behind them.

**Live:** https://hri-sap.github.io/

**Repository:** https://github.com/hri-sap/hri-sap.github.io

## Local development

Use Node.js **22.12 or later** (Node 24 LTS recommended).

```sh
npm ci
npm run dev
```

Open the local URL Astro prints, normally http://localhost:4321.

```sh
npm run build    # Generate the static site in dist/
npm run preview # Serve the production build locally
```

Astro generates plain HTML and CSS with a tiny progressive-enhancement script.
There is no client framework, third-party font request, analytics, cookie banner,
or backend. Everything important also works without JavaScript.

## Edit the content

**`src/data/site.ts`** is the content source. Edit `site` for the introduction,
section copy, bio, metadata, and GitHub links. `projects` holds the four selected
projects, their descriptions, technology labels, links, and illustration captions.
Keep descriptions factual; the illustrations are original concept studies, not
product screenshots. BisonAdvisor is explicitly credited as a collaborative project.

The composition is intentionally curated: BisonAdvisor is the featured project,
Scheduling Simulator and Notes App form a pair, and Memory Management Simulator
is a compact closing row. To replace an entry without changing layout, retain its
`id` and update its content. To add a fifth project or a new illustration type,
extend the `Project['id']` union, `src/components/ProjectVisual.astro`, and the relevant
layout rules in `src/styles/global.css`.

### Publish a note or blog entry

The `notes` array starts empty: no fictional articles or placeholder links. Add a
real entry to `src/data/site.ts`:

```ts
export const notes: Note[] = [
  {
    slug: 'your-unique-note-slug',
    title: 'Your actual note title',
    date: '2026-09-13',
    category: 'Building',
    summary: 'A short introduction to the note.',
    paragraphs: [
      'The first paragraph of your actual writing.',
      'Another paragraph, if you need one.',
    ],
  },
];
```

Use a unique lowercase, hyphen-separated slug and a valid `YYYY-MM-DD` date.
Entries appear in array order (put newest first). The empty state disappears when
there is an entry. Each article uses a native keyboard-accessible `<details>` element
that expands **inline on the same page**, including without JavaScript. Text is
escaped by Astro; the fields accept plain text, not raw HTML or Markdown.
Link directly to an entry with `https://hri-sap.github.io/#note-your-unique-note-slug`;
visitors can expand it there.

### Design and assets

- `src/pages/index.astro`: semantic page structure, SEO metadata, reveal enhancement.
- `src/styles/global.css`: colors, typography, layouts, breakpoints, reduced motion.
- `src/components/Sculpture.astro`: original gradient-and-contour hero illustration.
- `src/components/ProjectVisual.astro`: original SVG project concept studies.
- `public/favicon.svg`: original monogram favicon.
- `public/social-card.png`: locally generated 1200 × 630 social preview.
- `scripts/generate-social-card.mjs`: regenerates the social card from the built
  page's sculpture using Playwright; run while `npm run preview` is running.
- `src/pages/sitemap.xml.ts` and `public/robots.txt`: search engine discovery.

The site uses system sans-serif, serif, and monospace fonts, so exact glyphs vary
slightly by operating system. No font licenses or remote font hosts are required.

## Checks

```sh
npx playwright install chromium   # Once per machine
npm run check
npm run build
npm test
```

The tests run against the production build and cover desktop/mobile content,
metadata, assets, internal navigation, keyboard skip navigation, WCAG AA automated
checks via axe, overflow at 320–1920px, reduced motion, and no-JavaScript access.
External GitHub URLs are constrained to this profile; availability should also be
checked when replacing project links.

The tests read the same content file and automatically check inline expansion
when real notes are added, or the honest empty state when the array is empty.
Automated accessibility checks are a baseline, not a substitute for a manual
keyboard and screen-reader review.

## Publish

GitHub Pages must use **GitHub Actions** as its source in repository **Settings →
Pages**. `.github/workflows/deploy.yml` builds and tests the site on each push to
`main`, uploads only `dist/`, and deploys it using GitHub's official Pages actions.
A manual run is also available under the Actions tab.

```sh
git add .
git commit -m "Update personal site"
git push origin main
```

The workflow grants read-only repository access to the build; only the deployment
job gets `pages: write` and `id-token: write`. Pages deployments are serialized.
No deploy key, personal token, or repository secret is required.

Check the **Deploy personal site to GitHub Pages** run in the Actions tab, then
visit https://hri-sap.github.io/. A successful build alone does not mean the deploy
job has finished; allow the Pages cache a short time to update after deployment.

For an authorized CLI setup if Pages needs to be reconfigured:

```sh
gh api --method PUT repos/hri-sap/hri-sap.github.io/pages -f build_type=workflow
```

If the domain changes, update `site` in `astro.config.mjs`, the sitemap URL in
`public/robots.txt`, the canonical expectations in the tests, and this README.
Canonical and social image URLs and the sitemap page URL derive from Astro's site
setting. Never put private repository content, credentials, or personal contact
details in this public repository unless intended for publication.
