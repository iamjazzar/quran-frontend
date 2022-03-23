import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="bg-white dark:bg-gray-800">
      <Head>
        <meta name="theme-color" content="var(--bg)" />
        <link href="/fonts/UthmanicHafs_V20.ttf" as="font" crossOrigin="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
