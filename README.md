# MILAN — Culture in Motion

A responsive frontend for **MILAN**, the national-level cultural festival of SRM Institute of Science and Technology (SRMIST), Kattankulathur, organised by the Directorate of Student Affairs (DSA).

Built for the **DSA Tech Team Recruitment — Frontend Development practical task**.

> This is a demonstration site, not the official MILAN website. Festival facts are sourced and cited; event listings and registrations are illustrative samples and are labelled as such throughout the UI.

---

## Creative direction

**Concept — “Indian Maximalism, Culture in Motion.”** Taken from the MILAN’26 theme *“Live the Change: Indian Maximalism”*. Maximalism here means rich pattern, colour and type, held together by a strict system so it never becomes noise.

| Role | Colour | Hex | Rule |
| --- | --- | --- | --- |
| Background | Parchment | `#F6EEDF` | Default reading ground |
| Ink | Deep indigo | `#1B1446` | Text, borders, dark “night” sections |
| Primary | Vermilion | `#E2391B` | Primary actions, active states — one focal point per view |
| Secondary | Marigold | `#F5A623` | Celebration: motifs, numbers, accents on dark grounds |
| Accent | Magenta | `#E5197A` | Focus rings and a few posters only |

**Typography** (self-hosted via Fontsource, no third-party requests)
- *Bricolage Grotesque* — expressive display headings, the MILAN wordmark.
- *Instrument Serif Italic* — editorial accents (“culture in motion”).
- *Hanken Grotesk* — body text and UI.
- *Tiro Devanagari Hindi* — only for the word मिलन (Devanagari subset only).

**Graphic language** — all original SVG, generated in code, no downloaded clip-art:
- **Jharokha posters** — every event and category gets a poster: an arched Indian window over a block-print pattern (chevrons for dance, sound-bars for music, diamonds for drama, buti for fashion, kolam loops for art, ruled lines for literary, circuit traces for technical).
- **Rangoli mandala** generated from rings of petals, lozenges and dots.
- **Toran** (marigold-and-mango-leaf string) as a header and section divider.
- **Saree-border band** as a section divider.
- **Block-print buttons** — square corners with a solid ink offset that the button presses into. No pills, gradients, blobs or glassmorphism.

**Photography decision.** No verified, licensed festival photographs were available to bundle, so the site uses an original illustration system instead of unrelated stock images. Each event supports an optional `image` field — drop an official photo (with permission) into `public/` and set the path; it renders inside the same arch with a consistent duotone treatment.

## Features

- **Home** — art-directed hero (animated wordmark, poster collage, honest edition info: MILAN’26 is shown as *last* edition and MILAN’27 as *to be announced*), About MILAN with animated stats and a sourced legacy timeline, nine-domain highlights index, a scrollable rail of sample events, registration CTA.
- **Events explorer** (`/events`)
  - Keyword search across title, tagline, description, category, venue and keywords; multi-word AND matching; accent/case-insensitive; debounced.
  - Category filter (All, Dance, Music, Drama, Fashion, Creative Arts, Literary, Technical) as an accessible radio group with arrow-key support and live counts.
  - Search and category combine; state is kept in the URL (`?q=…&cat=…`) so views are shareable and survive refresh.
  - Reset action, live result count (announced to screen readers), and intentional empty states for *no results* and *no data*.
- **Event details modal** (`?event=<id>`)
  - Populated from the selected event’s data; shareable URL; browser Back closes it.
  - Close button, Escape key, backdrop click; focus moves in, is trapped, and returns to the trigger; page scroll locks.
  - Unknown ids show an “Event not found” state. Full-height sheet on small phones.
  - “Register for …” pre-selects the event on the registration page.
- **Registration** (`/register`)
  - Full name, email, college, phone, event, demo-consent checkbox.
  - Validation: required fields, name characters and length (2–60, Unicode-aware for Indian scripts), email format, Indian mobile format (10 digits starting 6–9; `+91`/`0` prefixes, spaces and dashes accepted), institution length (3–100), valid event.
  - Inline errors after blur, live correction, error summary with jump links, focus on first invalid field, `aria-invalid` / `aria-describedby`.
  - Loading state (spinner, disabled fieldset), duplicate-click guard, success panel with a `DEMO-XXXXXX` reference.
  - Mock API with simulated latency, server-side re-validation (422), duplicate detection (409) and server error (500).
  - Clearly stated as a demo: nothing is sent to SRMIST; data stays in the browser’s localStorage.
- **Navigation** — slim sticky bar that hides on scroll down and returns on scroll up; active states (including *About* while that section is in view); full-screen mobile menu with focus trap and Escape; skip link; route-change focus management; 404 page.
- **Motion** — staggered wordmark, scroll reveals, count-up stats, marquee, slow rangoli rotation, print-press hovers. All disabled under `prefers-reduced-motion`.

### Demo hooks for evaluators
- Register with an email ending in `@fail.test` → simulated server error.
- Register the same email for the same event twice → duplicate rejection.
- Open `/events?event=does-not-exist` → event-not-found state.
- Search `zzz` → empty state with reset.

## Tech stack

React 18 · Vite 5 · JavaScript · React Router 6 · Lucide React (icons) · plain CSS with custom properties · Fontsource (self-hosted fonts) · Vitest (unit tests) · Vercel.

No backend, no UI framework, no CSS framework.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests (Vitest)
npm run build      # production build → dist/
npm run preview    # serve the production build on http://localhost:4173
```

## Project structure

```
├── index.html
├── vercel.json                 SPA rewrites so deep links (/events?event=…) work
├── public/favicon.svg
├── scripts/e2e_check.py        optional browser smoke test (Playwright)
└── src/
    ├── main.jsx                entry: router, fonts, global CSS
    ├── App.jsx                 route table
    ├── pages/                  Home, Events, Register, NotFound
    ├── components/
    │   ├── layout/             Navbar, Footer, Layout, Logo, ScrollManager
    │   ├── home/               Hero, About, StatCounter, Domains, FeaturedEvents, RegisterCta
    │   ├── events/             EventCard, EventSearch, EventFilters, EventModal, EventArt,
    │   │                       EmptyState, SampleNotice, categoryIcons
    │   ├── registration/       RegistrationForm, FormField
    │   ├── decor/              Rangoli, Toran, BorderBand, Marquee (original SVG motifs)
    │   └── ui/                 Button
    ├── data/
    │   ├── events.js           sample events + categories + getEventById
    │   ├── festival.js         verified facts, stats, timeline, sources
    │   └── categoryStyles.js   poster colours/patterns per category
    ├── hooks/                  useEventFilters, useEventModal, useRegistrationForm,
    │                           useFocusTrap, useBodyScrollLock, useScrollReveal,
    │                           useScrollDirection, useCountUp, useDebouncedValue, useDocumentTitle
    ├── services/
    │   └── registrationApi.js  mock API (latency, 409/422/500, localStorage)
    ├── utils/
    │   ├── filterEvents.js     pure search/filter logic
    │   └── validation.js       pure field validators
    └── styles/
        ├── variables.css       design tokens
        ├── global.css          reset, base type, utilities
        └── components/         one stylesheet per component
```

**Architecture notes**
- Data, logic and UI are separate: `data/` holds content, `utils/` and `services/` hold pure logic (unit-tested), `hooks/` hold stateful behaviour, components render.
- Filter and modal state live in the URL, so the address bar is the single source of truth for what the user is looking at.
- Filtering is memoised on `(events, debouncedQuery, category)`; cards and posters are `memo`-ised.

## Testing

**Unit tests** (`npm test`) — 22 tests covering the data shape, search/filter logic (category, keyword, combined, AND semantics, empty input), every validator, and the mock API (success, duplicate, re-validation, server error).

**End-to-end smoke test** (`scripts/e2e_check.py`, 44 checks) — navigation and active states, search, filters, combined filtering, keyboard filter navigation, empty state and reset, modal open/close via button/Escape/backdrop/Back, focus trap and focus return, not-found event, register pre-selection, form validation and errors, loading state, double-submit prevention, success, duplicate and server-error states, mobile menu, mobile modal, 404, and zero console errors.

```bash
npm run build && npm run preview          # in one terminal
pip install playwright && playwright install chromium
python scripts/e2e_check.py               # in another
```

**Responsive checks** — verified at 1440, 1280, 768, 390 and 375 px with no horizontal overflow on any page.

## Deployment (Vercel)

1. Push the project to a GitHub repository.
2. In Vercel, **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (both auto-detected).
4. Deploy. `vercel.json` rewrites every path to `index.html` so `/events`, `/register` and `?event=` links work on refresh.

Or with the CLI: `npm i -g vercel && vercel --prod`.

## Sources

- SRMIST — [MILAN’26 event page](https://www.srmist.edu.in/events/milan-26/) (dates, 18th edition, 40+ events, categories, official Instagram handles)
- SRMIST — [“Celebrates the Spirit of Youth and Creativity with Milan 2026”](https://www.srmist.edu.in/srm-institute-of-science-and-technology-celebrates-the-spirit-of-youth-and-creativity-with-milan-2026/) (theme, participation figures, line-up, student-run under DSA)
- Wikipedia — [Milan (cultural festival)](https://en.wikipedia.org/wiki/Milan_(cultural_festival)) (meaning, 2008 founding, history, domains and formats)

## Disclaimer

Sample events (names, schedules, venues, rules) are invented for demonstration. Registrations are stored only in the visitor’s browser and are not submitted to SRMIST. MILAN is a festival of SRM Institute of Science and Technology.
