# Body Tone Fitness — Project Rules

Authoritative guidelines: [taste-skill](https://github.com/Leonxlnx/taste-skill) and [claude-seo](https://github.com/AgriciDaniel/claude-seo). Sections below are the enforced subset — treat as hard requirements.

## Dials (defaults)
`DESIGN_VARIANCE=8` (asymmetric — variance 4–10 MUST collapse to single column under 768px).
`MOTION_INTENSITY=6` (fluid CSS + Framer; never `window.addEventListener('scroll')`).
`VISUAL_DENSITY=4` (normal spacing; for >7 use `border-t`/`divide-y` instead of cards, monospace numerics).

## Stack & technical
- Next.js (RSC default), Tailwind v4, TypeScript. Verify deps in `package.json` before importing.
- Icons: `@phosphor-icons/react/dist/ssr` in RSC, `@phosphor-icons/react` in client. Never barrel-import.
- `min-h-[100dvh]` not `h-screen`. CSS Grid not flex math. Touch targets ≥44px. No horizontal scroll on mobile.
- Containers: `max-w-7xl mx-auto`. Standardize breakpoints `sm/md/lg/xl`.

## Typography
- BANNED: Inter, Roboto, Arial, Open Sans, Helvetica.
- Use Geist, Outfit, Cabinet Grotesk, Satoshi. Editorial serif (Fraunces, etc.) only for editorial — banned in dashboards.
- Display `text-4xl md:text-6xl tracking-tighter leading-none`. Body `text-base text-gray-600 leading-relaxed max-w-[65ch]`.
- Negative tracking on large headers, positive on small caps. Sentence case headers. `text-wrap: balance` on display.

## Color
- Max 1 accent, saturation <80%. NO AI purple/blue, NO neon, NO pure `#000000` (use `#0a0a0a`/zinc-950).
- One gray family (warm OR cool, not mixed). Tinted shadows, single light source. Add subtle grain.
- Project accent: champagne gold `#c9a961` (token `--color-gold`). Crimson appears only inside the logo image.

## Layout
- Centered hero BANNED at variance>4 — use split/asymmetric/left-aligned.
- 3-equal-card row BANNED — use zig-zag, asymmetric grid, masonry, horizontal scroll.
- Section padding `py-24` to `py-40`. Negative margins for layering, varied border radii.
- Hero: max 1 primary CTA. Text never overlaps images. No "scroll to explore" / arrow filler.

## Interactive states (every component ships all of these)
Loading (skeletal, not spinner) · Empty (composed) · Error (inline, never `alert()`, never "Oops!") · Hover (200–300ms) · Focus ring (visible) · Active (`-translate-y-[1px]` or `scale-[0.98]`) · Active nav state.

## Motion
- Animate `transform`/`opacity` only. NEVER `top/left/width/height`.
- Spring defaults from [src/lib/motion.ts](src/lib/motion.ts) (`SPRING_SOFT/SNAPPY/FLOAT`, `EASE_OUT_SOFT/IN_OUT_SOFT`). Don't inline literals.
- Magnetic hover: `useMotionValue`+`useTransform`, never `useState`. Reveals: `IntersectionObserver`.
- Perpetual animations isolated in memoized client leaves. `<AnimatePresence>` for dynamic lists. Respect `useReducedMotion`.
- Grain on fixed `pointer-events-none` pseudo only. `backdrop-blur` on fixed/sticky only. No arbitrary z-indexes. Don't mix GSAP/Three with Framer in same tree.

## Anti-slop (forbidden)
No neon glows, oversaturated accents, gradient text on H1, custom cursors, heavy shadows (`rgba(0,0,0,0.3)`), stacked glassmorphism. No "John Doe" / "Acme" / "Elevate/Seamless/Unleash". Use organic data (`47.2%`, `+91 86601 69891`). No Lorem Ipsum. Active voice. No `!` in success messages. No emojis anywhere — icons only. shadcn must be customized.

## Code quality
Semantic HTML (`<nav>/<main>/<article>/<aside>/<section>`). Tokens not hex literals in JSX. Descriptive `alt`. `useEffect` cleanup. Per-page meta + `og:image`. Footer privacy/terms. Branded 404. Skip-to-content link. `scroll-behavior: smooth`.

## Output discipline
Deliver every requested item complete. NEVER use placeholder patterns (`// ...`, `// TODO`, `// rest of code`, bare `...`) or evasive phrases ("for brevity", "rest follows the same pattern", "I'll leave that as an exercise"). On token limit: `[PAUSED — X of Y complete. Send "continue" to resume from: <next>]`.

## SEO (claude-seo subset)
- E-E-A-T: surface trainer credentials, real names, contact info on every page.
- CWV hard targets: LCP<2.5s, INP<200ms, CLS<0.1.
- Schema: `LocalBusiness`+`HealthClub`, `Person` per trainer, `Review`+`AggregateRating` (Google reviews are safe — verifiable), `BreadcrumbList`, `Article`, `BlogPosting`.
- NAP consistency from single source [src/lib/business.ts](src/lib/business.ts).
- Geo meta: `geo.region=IN-KA`, `geo.placename=Hubballi`, `geo.position`, `ICBM`. `lang="en-IN"`.
- All images: descriptive alt, modern format, lazy except 1 LCP `priority`.
- Stop & audit before 50+ location pages or 500+ programmatic. HowTo/FAQ/SpecialAnnouncement schema deprecated — avoid.

## Performance
- `next.config.mjs` `headers()` is single source for cache: hashed assets `public,max-age=31536000,immutable`; HTML `public,max-age=0,s-maxage=3600,stale-while-revalidate=86400`; APIs `private,no-store`. `compress: true`. `images.minimumCacheTTL` ≥1 year.
- `next/link` for all internal nav (don't disable prefetch). Preconnect every third-party origin in `<head>`.
- Exactly 1 `priority` image per viewport with explicit `sizes`. Fonts via `next/font`. `next/dynamic` only for genuinely below-fold/post-interaction client code.
- Two uses → generalise. Three uses → refactor overdue. Client components must be leaves, never page roots. Tokens from `@theme`, never hex in JSX.

## Workflow when redesigning existing UI
font swap → color cleanup → hover/active → layout → components → loading/error → typography polish. Never migrate frameworks. Test after each change. Small focused edits over big rewrites.

## Pre-flight (before delivery)
Mobile collapse · `min-h-[100dvh]` · `useEffect` cleanups · loading/empty/error all present · perpetual animations isolated · zero §anti-slop patterns · custom cubic-bezier · transform/opacity-only · backdrop-blur on fixed only · `next build` clean · LCP/INP/CLS verified.
