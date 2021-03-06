import { apiClient } from "api/client";
import { AxiosResponse } from "axios";
import { soraPaths } from "lib/ssr/sora";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { IAya } from "types/Aya";
import { ISora, ISoraParams } from "types/Sora";

interface ISoraDetail {
  sora: ISora;
  ayas: IAya[];
}

const SoraDetail: NextPage<ISoraDetail> = ({ sora, ayas }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>
        <FormattedMessage defaultMessage="Loading..." />
      </div>
    );
  }

  return (
    <div className="px-2">
      <span className="sr-only">{sora.name_en}</span>
      <span className="sr-only">{sora.name_ar}</span>
      <span className="sr-only">{sora.clean_name_ar}</span>
      <div className="font-hafs text-3xl leading-loose">
        <FormattedMessage
          defaultMessage="Surah {name}"
          values={{
            name: router.locale === "en" ? sora.name_en : sora.name_ar,
          }}
        />
      </div>

      <div className="font-hafs text-3xl text-justify leading-loose">
        {ayas.map((aya) => (
          <span key={aya.id}>{aya.text} </span>
        ))}
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await soraPaths();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { number }: { number: string } = params as ISoraParams;

  const { data } = await apiClient.quranSora.retrieve(number);
  const resp = await apiClient.quranSora.ayas(data.number);

  return data ? { props: { sora: data, ayas: resp.data } } : { notFound: true };
};

export default SoraDetail;
