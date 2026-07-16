# STING Capital Partners — website

A seven-page static marketing site for STING Capital Partners: a research firm
matching investment funds to the institutional investors and programs they fit.
Light, restrained, institutional design — warm cream paper, deep navy ink, and a
line-drawn spotted eagle ray as the firm's mark.

## Pages
- `index.html` — Home (hero + eagle ray, the thesis, the >90% selectivity statistic, who we serve, the 3-step process, principals band)
- `model.html` — The Model (screening approach, >90% rejection, individualized output, end-to-end flow)
- `for-funds.html` — For Funds (audience, the two match modes, fit criteria)
- `engagement.html` — Engagement (the report deliverable, what's inside, the process timeline)
- `principals.html` — Principals (founder-led page: James Ingle — MIT, Owen Strayer — Boston College; headshots `james-ingle.jpg` / `owen-strayer.jpg`)
- `contact.html` — Contact (Web3Forms inquiry form)
- `privacy.html` — Privacy policy (linked from the footer and the form consent line)

Shared `styles.css` + `main.js` (sticky nav, mobile menu, scroll-reveal, the form handler, footer year).
`favicon.svg` is the small eagle-ray glyph.

## Artwork
`eagle-ray.webp` — the hero engraving of a spotted eagle ray (*Aetobatus narinari*), supplied by
the client (`Spotted-Eagle Ray.jpg`). The source is a pen engraving on deckle-edged cream paper.
Rather than dropping in the scan as a rectangle, it is rendered as **ink on the page**: pixel
darkness is mapped to alpha (`(214 - luma) / (214 - 34)`, clamped) and the ink is tinted to the
brand navy `#1d3a5f`. That keeps every hatch line and the pale spots, drops the paper entirely,
and leaves no halo — the engraving prints straight onto the site's cream. ~81 KB, 544x492, preloaded.

It is treated as **decoration, not content** (`aria-hidden`, empty `alt`): anchored to the viewport
edge rather than the centred `.wrap`, `translate(30%, -35%)` so 30% swims off the right (70% on
screen) and it sits low enough to clear the fixed nav, with the tail trailing off the bottom-right,
plus `rotate(-8deg)` so it banks toward the statement. `.hero-copy` is capped at `min(32rem, 42vw)`
to keep clear of the wingtip — check that gap if either value changes. Below 1024px the hero stacks
and the figure returns to static flow.

Cropping note: the deckle edge shows up as a vertical line at x≈8 and x≈1011 in the source, so the
crop dodges it **horizontally only**. Do not apply a full border margin — the tail's thin curve
reaches y=525 and registers just a few px per row, so a bottom margin clips it flat.

To regenerate after replacing the source, re-run the darkness→alpha + tint + tight-crop steps.

**The brand mark** (inline in every nav + footer, and `favicon.svg`) is a silhouette traced from
that same engraving, so the mark and the hero art are the same animal in the same pose. It is
the **disc only** — below y≈355 the tail is a hairline that disappears at 30px and only shrinks
the disc, and cropping to the disc also required dropping the tail loop's rising arc, which
otherwise intrudes as a stray disconnected curve (largest-connected-component wins). Traced from
a 240px-wide mask to keep the path ~1.3 KB rather than ~4.3 KB, since it is inlined 14 times.
It uses `fill="currentColor"` so it renders navy in the nav and bone on the dark footer.

## Preview locally
From the repo root, any static file server works, e.g.:

```
npx http-server . -p 8905 -c-1
```

Then open http://127.0.0.1:8905/.

## Live configuration
1. **Web3Forms access key.** Live in `contact.html` (`access_key` = `7f0f4fa1-c07a-4fb1-91a2-f0a1167fa19e`).
   The form submits to Web3Forms; inquiries deliver to whatever email is configured on that account.
2. **Contact email.** Displayed contact address is `owen@stingcappartners.com` (every page footer,
   `contact.html`, and `privacy.html`). The separate email domain is intentional.
3. **Legal entity.** Footer/disclaimer identify **STING Capital Partners LLC, an Ohio limited liability
   company**. The disclaimer and the placement-agent/broker-dealer framing have NOT yet been reviewed
   by counsel — do that before marketing the site widely.

## Security posture
- A tight Content-Security-Policy `<meta>` on every page (`default-src 'self'`; styles/fonts limited to
  Google Fonts; `connect-src`/`form-action` limited to the Web3Forms API; `frame-ancestors 'none'`;
  `object-src 'none'`; `base-uri 'none'`).
- `referrer` policy `strict-origin-when-cross-origin`; no inline scripts; no third-party trackers or
  analytics; honeypot anti-spam field on the form; form posts only over HTTPS to Web3Forms.

## Deploy (Cloudflare Pages)
```
npx wrangler pages deploy . --project-name sting-capital --branch main --commit-dirty=true
```

## Known follow-ups
- Replace the principal headshots with professional photos (current files are low-resolution).
- og-image.png should be regenerated whenever the brand changes.
