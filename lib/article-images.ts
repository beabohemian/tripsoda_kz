type ArticleHeroImageBase = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  rights: string;
};

export type ArticleHeroImage = ArticleHeroImageBase &
  (
    | {
        kind: "ai-generated";
        provider: "Higgsfield";
      }
    | {
        kind: "photograph";
        credit: string;
        sourceUrl?: string;
      }
  );

export type PublicArticleHeroImage = Pick<
  ArticleHeroImageBase,
  "src" | "alt" | "caption" | "width" | "height"
> & { credit?: string };

export function getHeroImageAttribution(image: PublicArticleHeroImage): string {
  return image.credit ? `사진 제공 · ${image.credit}` : "";
}
