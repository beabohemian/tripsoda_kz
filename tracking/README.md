# KZ web analytics

Dedicated to kz.tripsoda.com; no changes to the main Tripsoda web/app containers.

- GTM: GTM-PLVM63K7 (account 6004064243, container 283767728)
- GA4: TRIPSODA Kazakhstan — kz.tripsoda.com (property 560917951)
- Web stream: KZ Website, 16210186329, G-Y23B8MFMC2
- Reporting: Korea timezone, KRW. Lead generation + traffic reports.
- GA4 enhanced measurement disabled. Page views are emitted by the app once per path, not hash changes. No direct gtag installation alongside GTM.
- Google signals/ad personalization disabled; KZ cookie domain and prefix isolate main-site GA cookies.

## Events

| Event | Meaning |
|---|---|
| page_view | Initial page or client-side path navigation |
| view_article | Article opened |
| article_read | At least 10 seconds elapsed and 75% scroll depth reached (proxy, not proof of reading) |
| quote_click | Proposal link or quote button clicked |
| form_start | First change to form per mounted form journey |
| form_review | Valid form advanced to review |
| form_submit_attempt | Final submission started |
| generate_lead | Inquiry API accepted the request; key event, no monetary value |
| form_submit_error | Request failed; not a lead |
| contact_click | WhatsApp/Kakao/email/phone link clicked; not a completed inquiry |
| language_change | Visitor explicitly changed language |

`generate_lead` is not a confirmed booking, payment, or proof of email delivery. No purchase event is emitted. A synchronous submit lock prevents concurrent duplicate requests. Accepted submissions can be counted more than once if the user intentionally starts another request.

## Data boundaries

Only allowlisted enums, article slugs and sanitized page URLs are sent. No name, company, email, phone, dates, budget, group size, service selection, medical detail, free text, UUID, WhatsApp message, or full clicked URL is collected. Referrers contain origin only. UTM source/medium/campaign accept only 1–80 ASCII letters, digits, underscores and hyphens; use anonymous campaign labels, never contact information. URLs lose query strings and fragments. Auto-event defaults use a safe root URL/title.

Tracking runs only on the production hostname; admin, medical preview, and localhost are excluded. Browser/ad blockers may prevent analytics. The contact form operates independently.

## Operation

GTM config is versioned in gtm-container.json. Import with Merge into the dedicated KZ container only. Validate before publishing. `node scripts/test-analytics.cjs` checks data boundaries. `npm run export` validates the static release. Do not commit out/.

GA4 realtime verifies collection immediately; processed reports and new custom dimensions may take 24–48 hours. Acquisition reports answer source/medium; landing-page and page reports answer content reach; generate_lead answers inquiries. For query-level organic search data, use Search Console separately; GA4 does not reveal all search keywords.
