import { apiClient } from "api/client";
import { ayaPaths } from "lib/ssr/aya";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { IAya, IAyaParams } from "types/Aya";

interface IAyaDetail {
  aya: IAya;
}

const AyaDetail: NextPage<IAyaDetail> = ({ aya }) => {
  const router = useRouter();

  if (router.isFallback)
    return (
      <div>
        <FormattedMessage defaultMessage="Loading..." />
      </div>
    );

  return (
    <>
      <span className="sr-only">{aya.text}</span>
      <span className="sr-only">{aya.clean_text}</span>
      <div className="font-hafs text-3xl text-justify leading-loose">
        {aya.text}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await ayaPaths();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IAyaParams;

  const { data } = await apiClient.quranAya.retrieve(id);
  return data ? { props: { aya: data } } : { notFound: true };
};

export default AyaDetail;
