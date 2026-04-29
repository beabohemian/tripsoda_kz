import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import CustomCursor from '../components/ui/CustomCursor';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <div className="film-grain"></div>
      <CustomCursor />
      <Layout>
        <Head>
          <title>트립소다 카자흐스탄 | TripSoda Kazakhstan</title>
          <meta name="description" content="카자흐스탄 현지 법인 직영 투어 플랫폼. 알마티 라운지를 거점으로 가이드, 차량, 숙박을 직접 운영하여 최고의 여행 경험을 선사합니다." />
          <meta name="keywords" content="카자흐스탄 여행, 알마티 투어, 중앙아시아 배낭여행, 알마티 렌터카, 카자흐스탄 가이드, 트립소다, TripSoda" />
          <link rel="canonical" href="https://kz.tripsoda.com" />
          <meta property="og:title" content="트립소다 카자흐스탄 | TripSoda Kazakhstan" />
          <meta property="og:description" content="카자흐스탄 현지 법인 직영 투어 플랫폼. 알마티 라운지를 거점으로 가이드, 차량, 숙박을 직접 운영하여 최고의 여행 경험을 선사합니다." />
          <meta property="og:image" content="https://kz.tripsoda.com/images/tour_charyn_1765783988719.png" />
          <meta property="og:url" content="https://kz.tripsoda.com" />
          <meta property="og:type" content="website" />
          <meta name="naver-site-verification" content="256ca89c5688a71c3727c601a16615cd493f5e17" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "트립소다 카자흐스탄",
                "alternateName": "TripSoda Kazakhstan",
                "url": "https://kz.tripsoda.com",
                "logo": "https://kz.tripsoda.com/favicon_mint_v2.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+7-778-986-1833",
                  "contactType": "customer service",
                  "areaServed": "KZ",
                  "availableLanguage": ["Korean", "Russian", "English"]
                },
                "sameAs": [
                  "https://instagram.com/tripsoda_kz",
                  "https://tripsoda.com"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Nazarbayev Ave 65, Business Center Building 4F #401/5",
                  "addressLocality": "Almaty",
                  "addressCountry": "KZ"
                }
              })
            }}
          />
          <link
            rel='stylesheet'
            as='style'
            crossOrigin='anonymous'
            href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'
          />
          <link rel='icon' href='/favicon_mint_v2.png?v=3' type='image/png' />
        </Head>
        
        {/* Global Page Transition */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default MyApp;
