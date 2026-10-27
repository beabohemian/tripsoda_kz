import Head from "next/head";
import { GetStaticPropsContext } from "next";
import GuideShell from "../../components/GuideShell";
import { getHeroImageAttribution } from "../../lib/article-images";
import { Article, getArticles } from "../../lib/articles";
export default function Guide({
  article: a,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const url = `https://kz.tripsoda.com/guides/${a.slug}/`;
  const imageUrl = a.heroImage
    ? `https://kz.tripsoda.com${a.heroImage.src}`
    : undefined;
  return (
    <GuideShell>
      <Head>
        <title>{a.title} | 트립소다 카자흐스탄</title>
        <meta name="description" content={a.description} />
        <link rel="canonical" href={url} key="canonical" />
        <meta property="og:title" content={a.title} />
        <meta property="og:description" content={a.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta
          property="article:published_time"
          content={`${a.published}T09:00:00+09:00`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: a.title,
              description: a.description,
              datePublished: a.published,
              dateModified: a.updated,
              inLanguage: "ko",
              mainEntityOfPage: url,
              ...(imageUrl ? { image: [imageUrl] } : {}),
              author: {
                "@type": "Organization",
                name: "트립소다 카자흐스탄 콘텐츠팀",
                url: "https://kz.tripsoda.com/",
              },
              publisher: {
                "@type": "Organization",
                name: "트립소다 카자흐스탄",
                logo: {
                  "@type": "ImageObject",
                  url: "https://kz.tripsoda.com/images/logo.png",
                },
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </Head>
      <main className="guide-article">
        <a href="/guides/">← 여행 가이드</a>
        <p className="guide-eyebrow">{a.country} · 자유여행</p>
        <h1>{a.title}</h1>
        <p className="guide-meta">
          트립소다 카자흐스탄 콘텐츠팀 · 게시 {a.published} · 정보 확인{" "}
          {a.updated}
        </p>
        {a.heroImage && (
          <figure className="guide-hero-image">
            <img
              src={a.heroImage.src}
              alt={a.heroImage.alt}
              width={a.heroImage.width}
              height={a.heroImage.height}
            />
            <figcaption>
              <span>{a.heroImage.caption}</span>
              <small>
                {getHeroImageAttribution(a.heroImage)} · {a.heroImage.rights}
              </small>
            </figcaption>
          </figure>
        )}
        <p className="guide-lead">{a.intro}</p>
        <nav className="guide-toc" aria-label="글 목차">
          <strong>이 글에서 확인할 것</strong>
          {a.sections.map((s, i) => (
            <a href={`#section-${i}`} key={s.heading}>
              {s.heading}
            </a>
          ))}
        </nav>
        {a.sections.map((s, i) => (
          <section id={`section-${i}`} key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {s.bullets && (
              <ul>
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <aside className="guide-sources">
          <h2>확인한 자료</h2>
          <ul>
            {a.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title} ↗
                </a>
              </li>
            ))}
          </ul>
          <p>
            요금·운행·입장 조건은 달라질 수 있습니다. 예약 전 운영기관의 최신
            안내를 확인해 주세요.
          </p>
        </aside>
        <aside className="guide-cta">
          <h2>일정은 직접, 필요한 준비는 함께.</h2>
          <p>
            카자흐스탄 차량·가이드·숙박이 필요한 구간만 알려주세요. 일정에 맞춰
            상담해 드립니다.
          </p>
          <a href="/#proposal">내 일정으로 문의하기 ↗</a>
        </aside>
        {related.length > 0 && (
          <aside>
            <h2>다음 여행 준비</h2>
            {related.map((r) => (
              <p key={r.slug}>
                <a href={`/guides/${r.slug}/`}>{r.title} →</a>
              </p>
            ))}
          </aside>
        )}
      </main>
    </GuideShell>
  );
}
export function getStaticPaths() {
  return {
    paths: getArticles().map((a) => ({ params: { slug: a.slug } })),
    fallback: false,
  };
}
export function getStaticProps({ params }: GetStaticPropsContext) {
  const all = getArticles();
  const article = all.find((a) => a.slug === params?.slug);
  if (!article) return { notFound: true };
  return {
    props: {
      article,
      related: all.filter((a) => a.slug !== article.slug).slice(0, 3),
    },
  };
}
