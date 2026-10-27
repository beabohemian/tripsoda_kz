// The data layer contains only allowlisted categorical values, never form values.
export const GTM_ID = "GTM-PLVM63K7";
const events = [
  "page_view",
  "view_article",
  "article_read",
  "quote_click",
  "form_start",
  "form_review",
  "form_submit_attempt",
  "generate_lead",
  "form_submit_error",
  "contact_click",
  "language_change",
] as const;
type EventName = (typeof events)[number];
type Fields = {
  audience_type?: "personal" | "business";
  request_type?: "inquiry" | "booking";
  contact_channel?: "whatsapp" | "kakao" | "email" | "phone";
  cta_location?: "article" | "home" | "other";
  site_language?: "ko" | "en" | "ru" | "kk";
};
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
export function cleanPath(value: string): string {
  const path = value.split(/[?#]/)[0];
  return /^\/(?:[a-z0-9/-]*)$/i.test(path) ? path : "/";
}
export function safeReferrer(value: string): string {
  try {
    return new URL(value).origin + "/";
  } catch {
    return "";
  }
}
export function track(event: EventName, fields: Fields = {}) {
  if (
    typeof window === "undefined" ||
    window.location.hostname !== "kz.tripsoda.com" ||
    !events.includes(event)
  )
    return;
  const path = cleanPath(window.location.pathname);
  if (path.startsWith("/admin") || path.startsWith("/preview")) return;
  const article = /^\/guides\/([a-z0-9-]+)\/?$/.exec(path)?.[1] || "";
  const language = fields.site_language || document.documentElement.lang;
  const data: Record<string, string> = {
    event_name: event,
    page_location: "https://kz.tripsoda.com" + path,
    page_referrer: safeReferrer(document.referrer),
    // Stable titles prevent medical selections or arbitrary DOM text from reaching GA.
    page_title: article || (path === "/" ? "Tripsoda Kazakhstan" : path),
    page_type: article
      ? "article"
      : path.startsWith("/guides")
        ? "guide_list"
        : path === "/"
          ? "home"
          : "other",
    article_slug: article,
    site_language: ["ko", "en", "ru", "kk"].includes(language)
      ? language
      : "ko",
    audience_type: "",
    request_type: "",
    contact_channel: "",
    cta_location: "",
  };
  // Preserve campaign attribution without forwarding arbitrary URL query strings.
  const query = new URLSearchParams(window.location.search);
  for (const [utm, parameter] of [
    ["utm_source", "campaign_source"],
    ["utm_medium", "campaign_medium"],
    ["utm_campaign", "campaign_name"],
  ]) {
    const value = query.get(utm);
    if (value && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) data[parameter] = value;
  }
  const allowed = {
    audience_type: ["personal", "business"],
    request_type: ["inquiry", "booking"],
    contact_channel: ["whatsapp", "kakao", "email", "phone"],
    cta_location: ["article", "home", "other"],
  };
  for (const key of Object.keys(allowed) as (keyof typeof allowed)[]) {
    const value = fields[key];
    if (value && allowed[key].includes(value)) data[key] = value;
  }
  // Replace the entire payload: no fields carry over from a previous event.
  (window.dataLayer ||= []).push({ event: "kz_web_event", kz: data });
}
