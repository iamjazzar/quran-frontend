import {
  AnnotationIcon,
  BookmarkAltIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { apiClient } from "api/client";
import MetaAndActionsHeading from "components/Headings/MetaAndActionsHeading";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { IQuranMeta } from "types/QuranMeta";
import { ISora } from "types/Sora";
import { classNames } from "utils";
import paths from "utils/paths";

interface ISoraList {
  soras: ISora[];
  meta: IQuranMeta;
}

const SoraDetail: NextPage<ISoraList> = ({ soras, meta }) => {
  const { locale } = useRouter();
  const { formatMessage } = useIntl();

  return (
    <>
      <div>
        <MetaAndActionsHeading
          title={formatMessage({ defaultMessage: "Quran Kareem Chapters" })}
          data={[
            {
              text: formatMessage(
                { defaultMessage: "{number} Juz'" },
                { number: meta.juz_count.toLocaleString(locale) }
              ),
              Icon: BookOpenIcon,
            },
            {
              text: formatMessage(
                { defaultMessage: "{number} Surahs" },
                { number: meta.sora_count.toLocaleString(locale) }
              ),
              Icon: BookmarkAltIcon,
            },
            {
              text: formatMessage(
                { defaultMessage: "{number} Ayas" },
                { number: meta.aya_count.toLocaleString(locale) }
              ),
              Icon: AnnotationIcon,
            },
          ]}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {soras.map((sora) => (
            <div
              key={sora.id}
              className={classNames(
                locale == "en" ? "py-5" : "py-4",
                "relative rounded-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-700 px-6 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              )}
            >
              <div className="flex-shrink-0 rtl:ml-5 ltr:mr-5">
                <div className="relative h-10 w-10 text-white">
                  <div className="h-10 w-10 rounded-md bg-indigo-500 dark:bg-slate-600 rotate-45" />
                  <div className="absolute right-0 top-2 h-10 w-10 text-center">
                    {sora.number.toLocaleString(locale)}
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="sr-only">{sora.name_ar}</span>
                <span className="sr-only">{sora.clean_name_ar}</span>

                <Link
                  href={{
                    pathname: paths.sora.retrieve,
                    query: { number: sora.number },
                  }}
                >
                  <a className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p
                      className={classNames(
                        locale == "ar" ? "font-hafs text-xl" : "",
                        "text-sm font-medium"
                      )}
                    >
                      <FormattedMessage
                        defaultMessage="Surah {name}"
                        values={{
                          name: locale === "en" ? sora.name_en : sora.name_ar,
                        }}
                      />
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      <FormattedMessage
                        defaultMessage="{number} Ayas"
                        values={{
                          number: sora.ayas_count.toLocaleString(locale),
                        }}
                      />
                    </p>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apiClient.quranSora.list("page_size=200");
  const meta = await apiClient.get(paths.api.quranMeta);

  return {
    props: { soras: data.results || [], meta: meta.data || {} },
  };
};

export default SoraDetail;
