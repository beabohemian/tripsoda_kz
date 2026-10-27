const assert = require("node:assert/strict");
const ts = require("typescript");
const fs = require("node:fs");
const vm = require("node:vm");
const code = ts.transpileModule(fs.readFileSync("lib/analytics.ts", "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const context = {
  exports: {},
  URL,
  URLSearchParams,
  window: {
    location: {
      hostname: "kz.tripsoda.com",
      pathname: "/guides/almaty-airport-to-city-transfer/",
      search:
        "?email=private@example.com&utm_source=newsletter&utm_medium=email&utm_campaign=airport",
    },
  },
  document: {
    referrer: "https://google.com/search?q=private",
    documentElement: { lang: "ko" },
  },
};
vm.runInNewContext(code, context);
const { track, cleanPath } = context.exports;
track("page_view", {
  name: "private",
  email: "private@example.com",
  audience_type: "personal",
});
const event = context.window.dataLayer[0];
assert.equal(event.kz.campaign_source, "newsletter");
assert.equal(event.kz.article_slug, "almaty-airport-to-city-transfer");
assert.equal(event.kz.page_referrer, "https://google.com/");
assert(!JSON.stringify(event).includes("private"));
assert(!event.kz.page_location.includes("?"));
track("contact_click", { contact_channel: "whatsapp" });
assert.equal(context.window.dataLayer[1].kz.audience_type, "");
track("unknown");
assert.equal(context.window.dataLayer.length, 2);
context.window.location.hostname = "localhost";
track("generate_lead");
assert.equal(context.window.dataLayer.length, 2);
context.window.location.hostname = "kz.tripsoda.com";
context.window.location.pathname = "/admin/";
track("page_view");
assert.equal(context.window.dataLayer.length, 2);
assert.equal(cleanPath("/?email=private#proposal"), "/");
console.log(
  "PASS: allowlist, URL redaction, attribution, private/local exclusion, payload reset",
);
