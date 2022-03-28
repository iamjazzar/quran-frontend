import { DotsVerticalIcon } from "@heroicons/react/solid";
import { apiClient } from "api/client";
import { AxiosResponse } from "axios";
import { soraPaths } from "lib/ssr/sora";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { ISora, ISoraParams } from "types/Sora";
import { classNames } from "utils";
import paths from "utils/paths";

interface ISoraList {
  soras: ISora[];
}

const SoraDetail: NextPage<ISoraList> = ({ soras }) => {
  const { locale } = useRouter();
  return (
    <>
      <div>
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Pinned Projects
        </h2>
        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {soras.map((sora) => (
            <li key={sora.id} className="col-span-1 flex shadow-sm rounded-md">
              <div
                className={classNames(
                  "bg-pink-600",
                  "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                )}
              >
                {"PI"}
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  {/* <span className="sr-only">{sora.name_en}</span> */}
                  <span className="sr-only">{sora.name_ar}</span>
                  <span className="sr-only">{sora.clean_name_ar}</span>
                  <Link
                    href={{
                      pathname: paths.sora.retrieve,
                      query: { number: sora.number },
                    }}
                  >
                    <a className="text-gray-900 font-medium hover:text-gray-600">
                      {/* <FormattedMessage
                        defaultMessage="Surah {name}"
                        values={{
                          name: locale === "en" ? sora.name_en : sora.name_ar,
                        }}
                      /> */}
                    </a>
                  </Link>
                  <p className="text-gray-500">
                    {/* <FormattedMessage
                      defaultMessage="{number} Ayas"
                      values={{
                        number: sora.ayas_count,
                      }}
                    /> */}
                  </p>
                </div>
                <div className="flex-shrink-0 ltr:pr-2 rtl:pl-2">
                  <button
                    type="button"
                    className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">
                      {/* <FormattedMessage defaultMessage="Open options" /> */}
                    </span>
                    <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apiClient.quranSora.list("page_size=200");
  return {
    props: { soras: data.results || [] },
  };
};

export default SoraDetail;
