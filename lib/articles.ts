import fs from "fs";
import path from "path";
import type { ArticleHeroImage, PublicArticleHeroImage } from "./article-images";
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
  heroImage?: ArticleHeroImage;
};
export type PublicArticle = Omit<Article, "heroImage"> & {
  heroImage?: PublicArticleHeroImage;
};

export function getArticles(): PublicArticle[] {
  const dir = path.join(process.cwd(), "content/articles");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map(
      (f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Article,
    )
    .map(({ heroImage, ...article }): PublicArticle => {
      if (!heroImage) return article;
      const { src, alt, caption, width, height } = heroImage;
      return {
        ...article,
        heroImage: {
          src,
          alt,
          caption,
          width,
          height,
          ...(heroImage.kind === "photograph" ? { credit: heroImage.credit } : {}),
        },
      };
    })
    .sort(
      (a, b) =>
        b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug),
    );
}
