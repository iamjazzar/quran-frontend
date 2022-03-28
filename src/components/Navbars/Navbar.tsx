import { useEffect, useState } from "react";
import { NextComponentType } from "next";
import { Disclosure } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import ThemeButton from "components/Buttons/ThemeButton";
import LanguageButton from "components/Buttons/LanguageButton";
import { FormattedMessage, useIntl } from "react-intl";
import { classNames } from "utils";
import Link from "next/link";
import paths from "utils/paths";
import Fasl from "components/SVGs/Fasl";

const Navbar: NextComponentType = () => {
  const { formatMessage } = useIntl();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const navigation = [
    {
      name: formatMessage({ defaultMessage: "Read" }),
      href: paths.sora.list,
      current: true,
    },
    {
      name: formatMessage({ defaultMessage: "Listen" }),
      href: "#",
      current: false,
    },
    {
      name: formatMessage({ defaultMessage: "Learn" }),
      href: "#",
      current: false,
    },
    {
      name: formatMessage({ defaultMessage: "Research" }),
      href: "#",
      current: false,
    },
  ];

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setIsVisible(scrollY <= lastScrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isVisible]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Disclosure as="header" className="contents z-50">
      {({ open }) => {
        return (
          <>
            <div
              className={classNames(
                isVisible ? "lg:translate-y-0" : "lg:-translate-y-11",
                "group transition-none sticky z-40 lg:z-50 top-0 px-2 sm:px-4 lg:px-8 backdrop-blur-lg duration-500 bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"
              )}
            >
              <div
                className={classNames(
                  isVisible ? "lg:translate-y-0" : "lg:translate-y-11",
                  "relative transition-none max-w-7xl mx-auto z-10 h-16 flex justify-between"
                )}
              >
                <div className="relative z-10 px-2 flex lg:px-0">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href={paths.home}>
                      <a>
                        <Fasl className="h-8 w-12 " />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      <FormattedMessage defaultMessage="Search" />
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 ltr:left-0 rtl:right-0 ltr:pl-3 rtl:pr-3 flex items-center">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full bg-white border dark:bg-slate-700 border-gray-300 dark:border-transparent rounded-md py-2 ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 dark:focus:placeholder-gray-500 light:focus:ring-1 focus:ring-indigo-500 dark:focus:ring-white dark:focus:bg-white focus:border-indigo-500 dark:focus:border-white"
                        placeholder={formatMessage({
                          defaultMessage: "search",
                        })}
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative z-10 flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-white">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:relative lg:z-10 ltr:lg:ml-4 rtl:lg:mr-4 lg:flex lg:items-center space-x-2 rtl:space-x-reverse">
                  <LanguageButton />
                  <ThemeButton />
                </div>
              </div>
              <nav
                className={classNames(
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0",
                  "hidden transition-all lg:flex lg:py-2 lg:space-x-8 rtl:lg:space-x-reverse justify-center"
                )}
                aria-label="Global"
              >
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                        : "text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white",
                      "rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            <Disclosure.Panel
              as="nav"
              className="sticky top-16 lg:hidden backdrop-blur-lg duration-500 bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"
              aria-label="Global"
            >
              <div className="pt-2 pb-3 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                        : "text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
};

export default Navbar;
