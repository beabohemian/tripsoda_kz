import fs from "fs";
import path from "path";
export type Article = {
  slug: string;
  title: string;
  description: string;
  country: "카자흐스탄" | "키르기스스탄";
  published: string;
  updated: string;
  keywords: string[];
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  sources: { title: string; url: string }[];
  heroImage?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
    kind: "ai-generated";
    provider: "Higgsfield";
    rights: string;
  };
};
export function getArticles(): Article[] {
  const dir = path.join(process.cwd(), "content/articles");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map(
      (f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Article,
    )
    .sort(
      (a, b) =>
        b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug),
    );
}
