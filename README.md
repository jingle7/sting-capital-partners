# STING Capital Partners — website

A five-page static marketing site for STING Capital Partners: precision capital
introduction matching investment funds to the institutional investors and programs
built to back them. Dark, restrained, institutional design with a faint hand-drawn
hornet motif and a muted amber-gold accent.

Live at [stingcapitalpartners.com](https://stingcapitalpartners.com).

## Pages
- `index.html` — Home (hero + hornet, the thesis, the >90% selectivity statistic, who we serve, the 3-step process)
- `model.html` — The Model (brute-force validation, >90% rejection, individualized output, end-to-end flow)
- `for-funds.html` — For Funds (audience, the two match modes, fit criteria)
- `engagement.html` — Engagement (the report deliverable, what's inside, the process timeline)
- `principals.html` — Principals (founder-led page: James Ingle — MIT, Owen Strayer — Boston College; headshots `james-ingle.jpg` / `owen-strayer.jpg`)
- `contact.html` — Contact (Web3Forms new-client inquiry form)

Shared `styles.css` + `main.js` (sticky nav, mobile menu, scroll-reveal, the form handler, footer year).
`favicon.svg` is the small hornet glyph.

## Preview locally
Plain static HTML/CSS/JS — no build step, no dependencies. Any static file
server works, e.g.:

```
python -m http.server 8905
```

Then open http://127.0.0.1:8905/.

## Live configuration
1. **Web3Forms access key.** Live in `contact.html` (`access_key` = `7f0f4fa1-c07a-4fb1-91a2-f0a1167fa19e`).
   The form submits to Web3Forms; inquiries deliver to whatever email is configured on that account.
   Web3Forms access keys are designed to be embedded client-side (they route submissions, they're not a
   secret credential) — this is the same key already live on the deployed site.
2. **Contact email.** Displayed contact address is `owen@stingcappartners.com` (every page footer and
   `contact.html`).
3. **Legal entity.** Footer/disclaimer identify **STING Capital Partners LLC, an Ohio limited liability
   company**. Review disclaimer wording with counsel if desired.

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
