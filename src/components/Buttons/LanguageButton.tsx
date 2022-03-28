import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TranslateIcon } from "@heroicons/react/outline";
import { classNames, switchLanguage } from "utils";
import { FormattedMessage } from "react-intl";
import { NextComponentType } from "next";
import { useRouter } from "next/router";

const LanguageButton: NextComponentType = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const availableLanguages = [
    {
      key: "ar",
      name: "العربية",
      short_name: "ع",
    },
    {
      key: "en",
      name: "English",
      short_name: "EN",
    },
  ];

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Menu as="div" className="relative inline-block text-left rtl:text-right">
      <div>
        <Menu.Button className="inline-flex items-center p-1 border border-transparent rounded-full drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 bg-transparent text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400">
          <span className="sr-only">
            <FormattedMessage defaultMessage="Switch Language" />
          </span>
          <TranslateIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-4">
          {availableLanguages.map((language) => (
            <Menu.Item key={language.key}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => switchLanguage(language.key, router)}
                  className={classNames(
                    active ? "bg-slate-50 dark:bg-slate-600/30" : "",
                    router.locale === language.key ? "text-sky-500" : "",
                    "py-1.5 px-2 flex items-center text-sm w-full font-medium"
                  )}
                >
                  <span
                    className={classNames(
                      router.locale === language.key
                        ? "text-sky-500"
                        : "text-gray-400",
                      "ltr:mr-3 rtl:ml-3 h-5 w-5"
                    )}
                  >
                    {language.short_name}
                  </span>
                  {/* <TranslateIcon
                    className={classNames(
                      router.locale === language.key
                        ? "text-sky-500"
                        : "text-gray-400",
                      "ltr:mr-3 rtl:ml-3 h-5 w-5"
                    )}
                    aria-hidden="true"
                  /> */}
                  {language.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageButton;
