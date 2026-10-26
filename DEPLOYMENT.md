# Tripsoda Kazakhstan renewal

This branch preserves the existing logo and mint/white/charcoal brand, adds the relationship between Tripsoda Seoul and the Kazakhstan entity, a CEO greeting, Korean/English/Russian/Kazakh content, free-form B2C/B2B requests, and private inquiry management.

## Runtime

Use Node 24 or later. Run `npm ci`, `npm run build`, and `npm start`. The site includes server APIs and **cannot be deployed as only static files to S3**. The existing S3-only GitHub workflow must be replaced with a server deployment before merging this branch for production. `npm run export` deliberately stops to prevent publishing a form without its API.

Deploy one Node service behind HTTPS on a host with a persistent disk. Mount that disk at `KZ_DATA_DIR`. SQLite WAL transactions provide durable records and optimistic version checks; this configuration is for a single-host service, not ephemeral/serverless storage or multiple replicas sharing a network filesystem. Configure persistent-disk backups using SQLite online backup. Protect and regularly restore-test backups because they contain customer data.

## Configuration

Copy `.env.example` into the deployment environment. Configure `APP_ORIGIN` exactly (no trailing slash), `KZ_DATA_DIR`, SMTP credentials, `MAIL_FROM`, and `MAIL_TO`. Never put SMTP credentials or admin secrets in browser-exposed variables. The approved primary recipient is jinki@tripsoda.com, with alua@tripsoda.com in CC. Configure MAIL_TO and MAIL_CC accordingly.

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

## 국가별 메디컬 투어 화면
- 한국 및 국가 미확인 접속: 한국어 카자흐스탄 여행 화면이 기본입니다.
- 신뢰하는 프록시의 IP 기반 국가 코드가 KZ 또는 RU일 때만 한국 메디컬 투어 전용 화면을 서버에서 렌더링합니다. 언어 선택이나 브라우저 언어만으로 메디컬 화면을 켜지 않습니다.
- `KZ_TRUSTED_COUNTRY_HEADER`에 프록시가 생성·덮어쓰는 국가 헤더 이름을 지정합니다. CloudFront라면 `cloudfront-viewer-country` 전달을 설정하고 원본 서버 직접 접근을 차단해야 합니다. 임의 클라이언트 헤더를 신뢰하지 마세요. HTML 캐시를 비활성화해야 합니다. 응답에도 private, no-store가 설정됩니다.
- 국가 헤더 미연결 상태에서는 현지 국가 자동 전환이 동작하지 않습니다. 운영 연결 후 KZ/RU/KR 및 국가 미확인 요청을 각각 검증하세요.
- 메디컬 화면은 최초 러시아어(카자흐스탄 접속 + 카자흐어 선호 시 카자흐어)이며 수동 선택 언어를 보존합니다. 외국어 선택은 국가 분기를 바꾸지 않습니다.
- 초기 문의에는 의료서류를 수집하지 않습니다. 건강검진·뷰티·중증질환 상담 요청은 관리화면에 각 분야와 KOREA MEDICAL TOUR 표식으로 저장됩니다. 진료 가능 여부는 의료기관 확인이 필요합니다. 제휴 병원, 의료 성과, 자격에 관한 미확인 주장은 넣지 않았습니다.

### 표시 언어별 서비스 구분 (최신)
- 운영 사이트에서 한국어·영어는 접속 국가와 관계없이 카자흐스탄 여행 화면을 표시합니다.
- 메디컬 화면은 신뢰하는 접속 국가가 KZ/RU이며 표시 언어가 ru/kk일 때만 표시합니다. 위의 국가별 초기 언어 설명보다 이 규칙이 우선합니다.
- 현지에서도 브라우저 선호 언어가 한국어·영어이면 해당 여행 화면을 표시합니다. 수동 언어 선택은 쿠키로 서버 렌더링에 반영합니다.
- `/preview-medical/`은 개발 환경에서만 열리는 검토용 예외이며 한국어로도 메디컬 내용을 확인할 수 있습니다. 운영 환경에서는 404입니다.

## Current production release: static + WhatsApp (approved 2026-10-26)
The user approved deploying the redesign through the existing main → S3 → CloudFront pipeline with WhatsApp inquiries first. `npm run export` now builds with `NEXT_PUBLIC_CONTACT_MODE=whatsapp` and excludes admin, API and preview pages. The review button opens a prefilled WhatsApp conversation; the customer must send the message there. No saved-request or email-delivery success is claimed. Server-side inquiry management remains available for future server deployment only.

Browser language selects ko/en/ru/kk; unknown languages fall back to Korean. The optional same-origin `/__country` endpoint can enable the medical market only for KZ/RU. Until the CloudFront country endpoint is installed, the public site stays in Kazakhstan-travel mode in all four languages. Korean and English always stay in travel mode. Do not claim country routing is active without validating the CloudFront setup.
