import { apiClient } from "api/client";
import { juzPaths } from "lib/ssr/juz";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { IJuz, IJuzParams } from "types/Juz";

interface IJuzDetail {
  juz: IJuz;
}

const JuzDetail: NextPage<IJuzDetail> = ({ juz }) => {
  const { isFallback, locale } = useRouter();

  if (isFallback)
    return (
      <div>
        <FormattedMessage defaultMessage="Loading..." />
      </div>
    );

  return (
    <>
      <span className="sr-only">{juz.number}</span>
      <div className="font-hafs text-3xl leading-loose">
        <FormattedMessage
          defaultMessage="Juz {number}"
          values={{
            number: locale === "en" ? juz.number : juz.number_worded_ar,
          }}
        />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await juzPaths();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { number }: { number: string } = params as IJuzParams;

  const { data } = await apiClient.quranJuz.retrieve(number);
  return data ? { props: { juz: data } } : { notFound: true };
};

export default JuzDetail;
