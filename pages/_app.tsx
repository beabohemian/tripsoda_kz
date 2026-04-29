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
          <meta name="naver-site-verification" content="256ca89c5688a71c3727c601a16615cd493f5e17" />
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
