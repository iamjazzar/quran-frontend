import { useEffect, useRef, useState } from "react";
import { NextComponentType } from "next";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import ThemeButton from "components/Buttons/ThemeButton";
import { FormattedMessage, useIntl } from "react-intl";
import { classNames } from "utils";
import Link from "next/link";
import paths from "utils/paths";
import Fasl from "components/SVGs/Fasl";

const Navbar: NextComponentType = () => {
  const { formatMessage } = useIntl();
  const prevScrollY = useRef(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [goingUp, setGoingUp] = useState(false);
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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;
      setCurrentPosition(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  return (
    <Disclosure as="header" className="contents z-50 bg-white dark:bg-gray-800">
      {({ open }) => {
        return (
          <>
            <div className="sticky top-0 px-2 sm:px-4 lg:divide-y lg:divide-gray-200 dark:lg:divide-gray-700 lg:px-8">
              <div className="relative z-10 bg-white dark:bg-gray-800 h-16 flex justify-between">
                <div className="relative z-10 px-2 flex lg:px-0">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href={paths.home}>
                      <a>
                        <Fasl className="h-8 w-12 text-slate-700 dark:text-white" />
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
                        className="block w-full bg-white border dark:bg-gray-700 border-gray-300 dark:border-transparent rounded-md py-2 ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 dark:focus:placeholder-gray-500 light:focus:ring-1 focus:ring-indigo-500 dark:focus:ring-white dark:focus:bg-white focus:border-indigo-500 dark:focus:border-white"
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
                <div className="hidden lg:relative lg:z-10 ltr:lg:ml-4 rtl:lg:mr-4 lg:flex lg:items-center">
                  <ThemeButton />
                </div>
              </div>
              <nav
                className={classNames(
                  goingUp || currentPosition <= 50
                    ? "opacity-100"
                    : "opacity-0",
                  "transition-opacity ease-in delay-150 hidden lg:py-2 lg:flex lg:space-x-8 rtl:lg:space-x-reverse justify-center bg-white dark:bg-gray-800"
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
                        : "text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
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
              className="lg:hidden"
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
