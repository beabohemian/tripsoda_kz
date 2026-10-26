import { readFileSync, readdirSync, writeFileSync } from "node:fs";
const files = readdirSync("content/articles").filter((f) =>
  f.endsWith(".json"),
);
const slugs = new Set();
const articles = files.map((file) => {
  const a = JSON.parse(readFileSync(`content/articles/${file}`, "utf8"));
  for (const key of [
    "slug",
    "title",
    "description",
    "country",
    "published",
    "updated",
    "intro",
  ])
    if (typeof a[key] !== "string" || !a[key].trim())
      throw new Error(`${file}: missing ${key}`);
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug) ||
    slugs.has(a.slug) ||
    file !== `${a.slug}.json`
  )
    throw new Error(`${file}: invalid/duplicate slug`);
  slugs.add(a.slug);
  for (const key of ["published", "updated"])
    if (!/^\d{4}-\d{2}-\d{2}$/.test(a[key]) || Number.isNaN(Date.parse(a[key])))
      throw new Error(`${file}: invalid date`);
  if (
    !["카자흐스탄", "키르기스스탄"].includes(a.country) ||
    !a.keywords?.length ||
    !a.sections?.length ||
    !a.sources?.length
  )
    throw new Error(`${file}: incomplete article`);
  for (const section of a.sections)
    if (!section.heading || !section.paragraphs?.length)
      throw new Error(`${file}: empty section`);
  for (const source of a.sources)
    if (!source.title || !source.url.startsWith("https://"))
      throw new Error(`${file}: invalid source`);
  return a;
});
const base = readFileSync("public/sitemap.xml", "utf8").replace(
  /\s*<url>\s*<loc>https:\/\/kz\.tripsoda\.com\/guides(?:\/[^<]*)?<\/loc>[\s\S]*?<\/url>/g,
  "",
);
const entries = [
  "  <url><loc>https://kz.tripsoda.com/guides/</loc></url>",
  ...articles.map(
    (a) =>
      `  <url><loc>https://kz.tripsoda.com/guides/${a.slug}/</loc><lastmod>${a.updated}</lastmod></url>`,
  ),
];
writeFileSync(
  "public/sitemap.xml",
  base.replace("</urlset>", entries.join("\n") + "\n</urlset>"),
);
console.log(`Validated ${articles.length} articles and updated sitemap.`);
