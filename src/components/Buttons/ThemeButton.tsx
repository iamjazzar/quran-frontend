import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  MoonIcon,
  DesktopComputerIcon,
  SunIcon,
} from "@heroicons/react/outline";
import { useTheme } from "next-themes";
import { classNames } from "utils";
import { FormattedMessage, useIntl } from "react-intl";
import { NextComponentType } from "next";

const ThemeButton: NextComponentType = () => {
  const { formatMessage } = useIntl();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const availableThemes = [
    {
      key: "light",
      name: formatMessage({ defaultMessage: "Light" }),
      Icon: SunIcon,
    },
    {
      key: "dark",
      name: formatMessage({ defaultMessage: "Dark" }),
      Icon: MoonIcon,
    },
    {
      key: "system",
      name: formatMessage({ defaultMessage: "System" }),
      Icon: DesktopComputerIcon,
    },
  ];

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Menu as="div" className="relative inline-block text-left rtl:text-right">
      <div>
        <Menu.Button
          className={classNames(
            theme === "system"
              ? "text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
              : "text-sky-400  hover:text-sky-500",
            "inline-flex items-center p-1 pb-1.5 pl-1.5 border bg-transparent border-transparent rounded-full drop-shadow-sm focus:outline-none focus:ring-2"
          )}
        >
          <span className="sr-only">
            <FormattedMessage defaultMessage="Switch theme" />
          </span>
          {resolvedTheme === "dark" ? (
            <MoonIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <SunIcon className="h-6 w-6" aria-hidden="true" />
          )}
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
          {availableThemes.map((option) => (
            <Menu.Item key={option.key}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => setTheme(option.key)}
                  className={classNames(
                    active ? "bg-slate-50 dark:bg-slate-600/30" : "",
                    theme === option.key ? "text-sky-500" : "",
                    "py-1.5 px-2 flex items-center text-sm w-full font-medium"
                  )}
                >
                  <option.Icon
                    className={classNames(
                      theme === option.key ? "text-sky-500" : "text-gray-400",
                      "ltr:mr-3 rtl:ml-3 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  {option.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ThemeButton;
