import { apiClient } from "api/client";
import { soraPaths } from "lib/ssr/sora";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { IAya, IPageGroup } from "types/Aya";
import { ISora, ISoraParams } from "types/Sora";

interface ISoraDetail {
  sora: ISora;
  ayas: IAya[];
}

const SoraDetail: NextPage<ISoraDetail> = ({ sora, ayas }) => {
  const router = useRouter();

  const pages: IPageGroup = ayas.reduce((prev, aya) => {
    aya.text = aya.text.replaceAll(
      aya.number.toLocaleString(router.locale),
      ""
    );

    return {
      ...prev,
      [aya.page]: [...(prev[aya.page] || []), aya],
    };
  }, {} as IPageGroup);

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

      <div className="mx-auto w-1/2 text-justify font-hafs text-3xl leading-loose">
        {Object.entries(pages).map(([page, verses]) => (
          <div key={page}>
            <div
              style={{
                border: "21px solid",
                borderImage: "url(/border.png) 48 / 32px / 0px repeat",
              }}
            >
              <div className="bg-quran-paper bg-opacity-60 p-4">
                {verses.map((obj) => (
                  <span key={obj.id}>
                    <span className="sr-only">{obj.clean_text}</span>
                    <span className="text-quran-verse">{obj.text}</span>
                    <span className="text-quran-number">
                      {obj.number.toLocaleString(router.locale)}
                    </span>{" "}
                  </span>
                ))}
              </div>
            </div>
            <div className="before:bg-quran-page after:bg-quran-page mt-6 mb-10 flex basis-full font-arabicSans text-base font-medium leading-0 text-quran-verse before:mx-2 before:h-px before:grow before:bg-quran-verse after:mx-2 after:h-px after:grow after:bg-quran-verse">
              {parseInt(page).toLocaleString(router.locale)}
            </div>
          </div>
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
