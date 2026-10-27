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

export function getHeroImageAttribution(image: ArticleHeroImage): string {
  return image.kind === "ai-generated"
    ? "AI 생성 이미지 · Higgsfield"
    : `사진 제공 · ${image.credit}`;
}
