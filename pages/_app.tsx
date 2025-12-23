import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('this is tripsoda kz');
  return (
    <Layout>
      <Head>
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'
        />
        <link rel='icon' href='/favicon_mint_v2.png?v=3' type='image/png' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
