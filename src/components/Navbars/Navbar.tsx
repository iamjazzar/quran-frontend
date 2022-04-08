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
import SearchPalette from "components/Search/SearchPalette";
import SearchButton from "components/Buttons/SearchButton";

const Navbar: NextComponentType = () => {
  const { formatMessage } = useIntl();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isUp, setIsUp] = useState<boolean>(false);
  const navigation = [
    {
      name: formatMessage({ defaultMessage: "Read" }),
      href: paths.sora.list,
      current: true,
    },
    {
      name: formatMessage({ defaultMessage: "Search" }),
      href: paths.search,
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
      setIsUp(scrollY < 50);
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
    <Disclosure as="header" className="z-50 contents">
      {({ open }) => {
        return (
          <>
            <div
              className={classNames(
                isVisible
                  ? "bg-white lg:translate-y-0"
                  : "bg-gray-100/50 lg:-translate-y-11",
                !isUp && "border-b border-slate-200 dark:border-slate-800",
                "supports-backdrop-blur:bg-white/95 group sticky top-0 z-40 px-2 backdrop-blur-lg transition-none duration-500 dark:bg-slate-900/75 sm:px-4 lg:z-50 lg:px-8"
              )}
            >
              <div
                className={classNames(
                  isVisible ? "lg:translate-y-0" : "lg:translate-y-11",
                  "relative z-10 mx-auto flex h-16 max-w-7xl justify-between transition-none"
                )}
              >
                <div className="relative z-10 flex px-2 lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href={paths.home}>
                      <a>
                        <Fasl className="h-8 w-12 " />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                  <SearchButton />
                </div>
                <div className="relative z-10 flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-white">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden space-x-2 rtl:space-x-reverse lg:relative lg:z-10 lg:flex lg:items-center ltr:lg:ml-4 rtl:lg:mr-4">
                  <LanguageButton />
                  <ThemeButton />
                </div>
              </div>
              <nav
                className={classNames(
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0",
                  "hidden justify-center transition-all lg:flex lg:space-x-8 lg:py-2 rtl:lg:space-x-reverse"
                )}
                aria-label="Global"
              >
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white"
                          : "text-gray-900 hover:bg-gray-50 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white",
                        "inline-flex items-center rounded-md py-2 px-3 font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>

            <Disclosure.Panel
              as="nav"
              className="supports-backdrop-blur:bg-white/95 sticky top-16 bg-white backdrop-blur-lg duration-500 dark:bg-slate-900/75 lg:hidden"
              aria-label="Global"
            >
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white"
                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
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
