import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="var(--theme)" />
        <link href="/fonts/UthmanicHafs_V20.ttf" as="font" crossOrigin="" />
      </Head>
      <body className="antialiased text-slate-700 dark:text-white bg-white dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
