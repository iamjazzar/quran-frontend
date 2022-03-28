import { useEffect, useMemo } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { IntlProvider } from "react-intl";

import "tailwindcss/tailwind.css";
import English from "locales-compiled/en.json";
import Arabic from "locales-compiled/ar.json";
import { useRouter } from "next/router";
import Layout from "components/Layouts/Layout";

import "../styles.css";

function QuranApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["ar"];
  const messages = useMemo(() => {
    switch (shortLocale) {
      case "ar":
        return Arabic;
      case "en":
        return English;
      default:
        return Arabic;
    }
  }, [shortLocale]);

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document?.querySelector("html")?.setAttribute("dir", dir);
  }, [locale]);

  return (
    <ThemeProvider attribute="class">
      <IntlProvider locale={shortLocale} messages={messages}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default QuranApp;
