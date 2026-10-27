import Head from "next/head";
import GuideShell from "../../components/GuideShell";
import { getHeroImageAttribution } from "../../lib/article-images";
import { Article, getArticles } from "../../lib/articles";
export default function Guides({ articles }: { articles: Article[] }) {
  return (
    <GuideShell>
      <Head>
        <title>카자흐스탄·키르기스스탄 자유여행 가이드 | 트립소다</title>
        <meta
          name="description"
          content="알마티 일정, 근교 이동, 여행 경비부터 비슈케크·이식쿨까지. 중앙아시아 자유여행을 준비할 때 필요한 실용 가이드."
        />
        <link
          rel="canonical"
          href="https://kz.tripsoda.com/guides/"
          key="canonical"
        />
        <meta
          property="og:title"
          content="카자흐스탄·키르기스스탄 자유여행 가이드"
        />
        <meta property="og:url" content="https://kz.tripsoda.com/guides/" />
      </Head>
      <main className="guide-main">
        <p className="guide-eyebrow">TRIPSODA TRAVEL NOTES</p>
        <h1>
          떠나기 전에,
          <br />
          궁금했던 것들.
        </h1>
        <p className="guide-lead">
          카자흐스탄을 중심으로 키르기스스탄까지.
          <br />
          일정과 이동, 예산을 직접 정하는 여행자를 위한 가이드입니다.
        </p>
        <div className="guide-cards">
          {articles.map((a) => (
            <a className="guide-card" key={a.slug} href={`/guides/${a.slug}/`}>
              {a.heroImage && (
                <figure className="guide-card-image">
                  <img
                    src={a.heroImage.src}
                    alt={a.heroImage.alt}
                    width={a.heroImage.width}
                    height={a.heroImage.height}
                    loading="lazy"
                  />
                  <figcaption>
                    {getHeroImageAttribution(a.heroImage)}
                  </figcaption>
                </figure>
              )}
              <span>
                {a.country} · {a.published}
              </span>
              <h2>{a.title}</h2>
              <p>{a.description}</p>
              <b>가이드 읽기 ↗</b>
            </a>
          ))}
        </div>
      </main>
    </GuideShell>
  );
}
export function getStaticProps() {
  return { props: { articles: getArticles() } };
}
