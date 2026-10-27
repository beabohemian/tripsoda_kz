import { useEffect } from "react";
import { useRouter } from "next/router";
import { cleanPath, GTM_ID, track } from "../lib/analytics";

export default function WebAnalytics() {
  const router = useRouter();
  useEffect(() => {
    if (
      location.hostname !== "kz.tripsoda.com" ||
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/preview")
    )
      return;
    window.dataLayer ||= [];
    if (!document.getElementById("kz-gtm")) {
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const script = document.createElement("script");
      script.id = "kz-gtm";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);
    }
    let lastPath = "";
    let articleRead = false;
    let enteredAt = 0;
    function page(url: string) {
      const path = cleanPath(url);
      if (path === lastPath) return;
      lastPath = path;
      articleRead = false;
      enteredAt = Date.now();
      track("page_view");
      if (/^\/guides\/[a-z0-9-]+\/?$/.test(path)) track("view_article");
    }
    function readArticle() {
      if (
        articleRead ||
        !/^\/guides\/[a-z0-9-]+\/?$/.test(lastPath) ||
        Date.now() - enteredAt < 10000
      )
        return;
      if (
        (scrollY + innerHeight) / document.documentElement.scrollHeight >=
        0.75
      ) {
        articleRead = true;
        track("article_read");
      }
    }
    function click(e: MouseEvent) {
      const anchor = (e.target as Element)?.closest?.("a");
      if (!anchor) return;
      const url = new URL(anchor.href, location.href);
      const cta_location = location.pathname.startsWith("/guides/")
        ? "article"
        : location.pathname === "/"
          ? "home"
          : "other";
      if (url.origin === location.origin && url.hash === "#proposal")
        track("quote_click", { cta_location });
      const contact_channel =
        url.hostname === "wa.me"
          ? "whatsapp"
          : url.hostname === "pf.kakao.com"
            ? "kakao"
            : url.protocol === "mailto:"
              ? "email"
              : url.protocol === "tel:"
                ? "phone"
                : undefined;
      if (contact_channel)
        track("contact_click", { contact_channel, cta_location });
    }
    page(router.asPath);
    router.events.on("routeChangeComplete", page);
    document.addEventListener("click", click);
    window.addEventListener("scroll", readArticle, { passive: true });
    const timer = window.setInterval(readArticle, 5000);
    return () => {
      router.events.off("routeChangeComplete", page);
      document.removeEventListener("click", click);
      window.removeEventListener("scroll", readArticle);
      clearInterval(timer);
    };
  }, [router.events]);
  return null;
}
