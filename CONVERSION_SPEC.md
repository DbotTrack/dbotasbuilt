# Dbot Asbuilt — HTML → React/TSX conversion spec (for page components)

We are porting `dbot-asbuilt-web.html` (a single-file prototype) into a Vite + React + TypeScript + Tailwind + React Router app under `src/`. The design system, tokens, and ALL reusable component classes already exist in `src/index.css` and `tailwind.config.js`. **You only build leaf page components** — do NOT touch config, index.css, contexts, or layouts.

## Hard rules
- Each page is a **default-exported function component**, TypeScript, no props.
- Import React Router `useNavigate` and call `navigate(<route>)` in place of the prototype's `goView(<id>)`.
- Import `useApp` from `../../context/AppContext` for cross-cutting actions and `useToast` from `../../context/ToastContext` for `toast(...)`.
- Use existing CSS **component classes** (below) via `className="..."`. Use Tailwind **utility classes** only for one-off layout (spacing/flex/grid/colors) — replace inline `style="..."` with utilities. Tokens: colors `orange / orange-deep / orange-soft / orange-tint / purple / purple-soft / purple-tint / sage / lavender / grey-1 / grey-2 / grey-3 / grey-bg / ink / ink-2 / ink-3 / line / page`; radius `rounded-sm/md/lg/xl/pill`; shadows `shadow-sm/md/lg/xl/purple`.
- Use `<DbotLogo variant="..."/>` from `../../components/common/DbotLogo` and `<VizThumb seed={n} width={W} height={H}/>` from `../../components/common/VizThumb` (replaces `<svg class="viz-thumb" data-seed=..>`; read W/H from the source viewBox).
- Preserve ALL text content, SVG icon paths, seeds, numbers and copy EXACTLY.
- Convert `class` → `className`, `stroke-width` → `strokeWidth`, `stroke-linecap`→`strokeLinecap`, self-close tags, `&amp;`→`&`, `&deg;`→`°`, `&plusmn;`→`±`, `&rsquo;`→`’`, etc.

## `useApp()` provides
`bookProject()`, `logIn()`, `openEstimator()`, `scrollToSection(id)` (id like `'contact'`, `'services'`, `'pricing'`, `'about'`, `'types'`, `'how'`).

## goView(id) → route map
| prototype id | route |
|---|---|
| home | `/` (use `navigate('/')`) |

The prototype's portal views are **not** ported: sign-in, booking and the client portal live in the client app at app.dbotasbuilt.com (`src/lib/clientApp.ts`).

## Marketing sub-pages
Available classes: `page-head` (wrap in `<div className="container-site page-head">`), `section` / `section-tight` (wrap inner in `<div className="container-site">`), `sec-head` / `sec-head center`, `eyebrow` / `eyebrow-sage`, `feature-grid` / `feature-card` (.fic), `work-grid` / `work-card` / `work-thumb` / `work-body` (.wtag), `cta-band`, `trust` / `trust-inner` / `trust-item` (.n/.l) / `trust-sep`, `card`, `field`, `input`, `ci-row` (.l/.v).
- Section background tint `style="background:rgba(134,152,151,0.05)"` → `style={{ background: 'rgba(134,152,151,0.05)' }}`.
- Buttons: `className="btn btn-primary btn-lg"`, `btn btn-ghost`, etc. Book → `onClick={bookProject}`; estimate → `onClick={openEstimator}`.
- Numbered circle badges in source use inline styles — reproduce with utilities, e.g. `<div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center font-semibold mb-3.5">1</div>` (colors: 1=orange, 2=purple, 3=sage per source).

## Icons
Keep every `<svg viewBox="0 0 24 24">…</svg>` icon exactly (convert attrs to camelCase). Leave `fill`, `stroke`, `strokeWidth` as they appear; component classes style them where needed.
