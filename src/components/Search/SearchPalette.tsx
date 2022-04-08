import { Fragment, useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { BookOpenIcon, EmojiSadIcon } from "@heroicons/react/outline";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { classNames } from "utils";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { apiClient } from "api/client";
import paths from "utils/paths";
import { AxiosResponse } from "axios";
import { ISearchGroup, ISearchItem } from "types/Search";
import { IAya } from "types/Aya";
import { ISora } from "types/Sora";
import { IAyaSearchSuggest } from "types/AyaSearch";
import Link from "next/link";
import { ListResponse } from "api/consumers";

interface ISearchPalette {
  isOpen: boolean;
  onDismiss: (value: boolean) => void;
}

const SearchPalette = ({ isOpen, onDismiss }: ISearchPalette) => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<ISearchItem[]>([]);

  function close() {
    onDismiss(false);
  }

  useEffect(() => {
    if (!query) {
      return () => setItems([]);
    }

    apiClient.ayaSearch
      .suggest(query)
      .then((response: AxiosResponse<IAyaSearchSuggest>) => {
        let searchItems: ISearchItem[] = [];

        response.data.clean_text__completion?.[0].options.map((option) =>
          searchItems.push({
            type: "suggestion",
            id: option._source.id,
            meta: option,
            text: option._source.clean_text,
            sora: option._source.sora as ISora,
            aya: option._source,
          })
        );

        apiClient.ayaSearch
          .phraseSearch(query)
          .then((response: AxiosResponse<ListResponse<IAya>>) => {
            response.data.results?.map((aya) =>
              searchItems.push({
                type: "aya",
                id: aya.id,
                meta: aya,
                text: aya.clean_text,
                sora: aya.sora as ISora,
                aya: aya,
              })
            );
            setItems(searchItems);
          });
      });
  }, [query]);

  const groups: ISearchGroup = items.reduce((prev, item) => {
    return {
      ...prev,
      [item.type]: [...(prev[item.type] || []), item],
    };
  }, {} as ISearchGroup);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        as="div"
        className="supports-backdrop-blur:bg-white/95 fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-100/50 p-4 backdrop-blur duration-100 dark:bg-slate-900/75 sm:p-6 md:p-20"
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            value={items[0]}
            onChange={(item: ISearchItem) => {
              close();

              return router.push({
                pathname: paths.sora.retrieve,
                query: { number: item.sora.number },
              });
            }}
          >
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-3.5 h-5 w-5 text-gray-400 ltr:left-4 rtl:right-4"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full overflow-hidden border-0 bg-transparent text-gray-800 placeholder-gray-400 focus:ring-0 ltr:pl-11 ltr:pr-4 rtl:pr-11 rtl:pl-4 sm:text-sm"
                placeholder={formatMessage({ defaultMessage: "Search..." })}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && items.length ? (
                <div className="pointer-events-none absolute top-3.5 h-5 max-w-xs text-sm text-gray-400 ltr:right-4 rtl:left-4">
                  <FormattedMessage
                    defaultMessage="{number} results"
                    values={{
                      number: items.length.toLocaleString(router.locale),
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>

            {query === "" && (
              <div className="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14">
                <BookOpenIcon
                  className="mx-auto h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <p className="mt-4 font-semibold text-gray-900">
                  <FormattedMessage defaultMessage="Search for verses, chapters, or words" />
                </p>
                <p className="mt-2 text-gray-500">
                  <FormattedMessage defaultMessage="Quickly access verses and chapters by running a global search." />{" "}
                  <FormattedMessage
                    defaultMessage="Or use our {link} tool."
                    values={{
                      link: (
                        <Link href={paths.search}>
                          <a className="font-medium text-indigo-500 underline decoration-indigo-500 decoration-dotted hover:text-indigo-600 hover:decoration-solid">
                            <FormattedMessage defaultMessage="Advanced Search" />
                          </a>
                        </Link>
                      ),
                    }}
                  />
                </p>
              </div>
            )}

            {query !== "" && items.length > 0 && (
              <Combobox.Options
                static
                className="max-h-80 scroll-pt-11 scroll-pb-2 space-y-2 overflow-y-auto pb-2"
              >
                {Object.entries(groups).map(([category, items]) => (
                  <li key={category}>
                    <h2 className="bg-gray-100 py-2.5 px-4 text-xs font-semibold text-gray-900">
                      {category === "juz" && (
                        <FormattedMessage defaultMessage="Juz's" />
                      )}
                      {category === "sora" && (
                        <FormattedMessage defaultMessage="Chapters" />
                      )}
                      {category === "aya" && (
                        <FormattedMessage defaultMessage="Verses" />
                      )}
                      {category === "suggestion" && (
                        <FormattedMessage defaultMessage="Suggestions" />
                      )}
                    </h2>
                    <ul className="mt-2 text-sm text-gray-800">
                      {items.map((item) => (
                        <Combobox.Option
                          key={item.id}
                          value={item}
                          className={({ active }) =>
                            classNames(
                              "flex cursor-default select-none px-4 py-2",
                              active &&
                                "cursor-pointer bg-indigo-600 text-white"
                            )
                          }
                        >
                          <div className="flex-1 truncate">{item.text}</div>
                          <div className="flex-none text-left text-slate-300 ltr:pl-2 rtl:pr-2">
                            <FormattedMessage
                              defaultMessage="Surah {name}"
                              values={{
                                name:
                                  router.locale === "en"
                                    ? item.sora.name_en
                                    : item.sora.clean_name_ar,
                              }}
                            />
                            :{item.aya.number.toLocaleString(router.locale)}
                          </div>
                        </Combobox.Option>
                      ))}
                    </ul>
                  </li>
                ))}
              </Combobox.Options>
            )}

            {query !== "" && items.length === 0 && (
              <div className="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14">
                <EmojiSadIcon
                  className="mx-auto h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <p className="mt-4 font-semibold text-gray-900">
                  <FormattedMessage defaultMessage="No results found" />
                </p>
                <p className="mt-2 text-gray-500">
                  <FormattedMessage defaultMessage="We couldn’t find anything with that term. Please try another term." />{" "}
                  <FormattedMessage
                    defaultMessage="Want to try our {link} tool."
                    values={{
                      link: (
                        <Link href={paths.search}>
                          <a className="font-medium text-indigo-500 underline decoration-indigo-500 decoration-dotted hover:text-indigo-600 hover:decoration-solid">
                            <FormattedMessage defaultMessage="Advanced Search" />
                          </a>
                        </Link>
                      ),
                    }}
                  />
                </p>
              </div>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default SearchPalette;
