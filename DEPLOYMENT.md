# Tripsoda Kazakhstan renewal

This branch preserves the existing logo and mint/white/charcoal brand, adds the relationship between Tripsoda Seoul and the Kazakhstan entity, a CEO greeting, Korean/English/Russian/Kazakh content, free-form B2C/B2B requests, and private inquiry management.

## Runtime

Use Node 24 or later. Run `npm ci`, `npm run build`, and `npm start`. The site includes server APIs and **cannot be deployed as only static files to S3**. The existing S3-only GitHub workflow must be replaced with a server deployment before merging this branch for production. `npm run export` deliberately stops to prevent publishing a form without its API.

Deploy one Node service behind HTTPS on a host with a persistent disk. Mount that disk at `KZ_DATA_DIR`. SQLite WAL transactions provide durable records and optimistic version checks; this configuration is for a single-host service, not ephemeral/serverless storage or multiple replicas sharing a network filesystem. Configure persistent-disk backups using SQLite online backup. Protect and regularly restore-test backups because they contain customer data.

## Configuration

Copy `.env.example` into the deployment environment. Configure `APP_ORIGIN` exactly (no trailing slash), `KZ_DATA_DIR`, SMTP credentials, `MAIL_FROM`, and `MAIL_TO`. Never put SMTP credentials or admin secrets in browser-exposed variables. Recipient defaults shown in the example are the existing head-manager and CEO business emails; review them before enabling production delivery.

Configure an administrator password with `npm run admin:setup`, passing a unique password of at least 16 characters through stdin and ending input. This writes only a salted hash and session secret to ignored `.env.local`. Restart the process. The password is not printed or committed. The administration page is `/admin/`; authentication uses an eight-hour HttpOnly SameSite=Strict signed cookie, Secure when `APP_ORIGIN` is HTTPS. Rotating the configured password/session secret invalidates sessions.

If deployed behind a reverse proxy, enable `TRUST_PROXY=true` only when that proxy overwrites `X-Forwarded-For` and direct access to Node is blocked. Otherwise the default rate limit treats connections through the proxy as one source.

## Inquiry and booking lifecycle

1. A visitor chooses personal/business and inquiry/booking, supplies contact and project information, reviews it, and submits.
2. The server validates fields, origin, consent and rate limit, then commits an idempotent record to SQLite.
3. SMTP sends the staff alert with subject `[KZ 접수]`. Missing credentials leave a pending notification; delivery failures leave a failed notification. Saved inquiries are never discarded because SMTP fails. The admin can retry up to ten unsent messages per action. Delivery status means SMTP acceptance, not proof of inbox delivery.
4. Staff move the record from new request → contacted → awaiting deposit → confirmed. Confirmation requires an explicit actual-payment verification, positive amount, currency and bank reference. The system does not access a bank account or automatically verify deposits.
5. Concurrent edits are rejected; staff reload the record. State changes are recorded in a private audit table.

## Verification

`node scripts/test-inquiries.mjs` uses an isolated temporary database and local test server. It checks unauthorized access, origin validation, input validation, duplicate submissions, persistence across a server restart, unsent email state, booking transitions, deposit verification and stale-write protection. It never sends email. Then run `npx tsc --noEmit` and `npm run build`.

## Before production

- Connect the permanent Node host and SMTP provider. No production hosting or SMTP credentials were available during implementation.
- Set up the administrator password and the staff recipients.
- Review the drafted CEO greeting and translated copy before publication.
- Confirm the customer-data retention policy and publish the detailed privacy notice.
- Verify a real staff email arrives and a real inquiry can be handled in the production admin.

The Codex chat monitor is separate from this application. It checks connected Gmail every 15 minutes for new `[KZ 접수]` messages and reports only new arrivals. It cannot report mail that is not delivered to the connected mailbox or forwarded there. No production mail delivery has been claimed or tested.

## Container option

`Dockerfile` and `compose.yaml` provide a Node 24 service with a named data volume. Supply `.env.production` with the reviewed configuration and run `docker compose up --build -d` on the deployment host. Port 4011 is bound to loopback; terminate HTTPS in the host's reverse proxy and route the existing domain there. The image build excludes local environment files and data. Container packaging is supplied but was not executed because Docker was unavailable in this workspace.
