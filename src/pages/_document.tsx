import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="var(--theme)" />
        <link href="/fonts/UthmanicHafs_V20.ttf" as="font" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased text-slate-700 dark:text-white bg-white dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
