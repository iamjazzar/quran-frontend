import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "utils";
import { IHeadingAction, IHeadingData } from "types/Headings";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

interface IMetaAndActionsHeading {
  actions?: IHeadingAction[];
  data?: IHeadingData[];
  title: string;
}

const MetaAndActionsHeading = ({
  title,
  actions,
  data,
}: IMetaAndActionsHeading) => {
  const { locale } = useRouter();

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex-1 min-w-0 mt-5 mb-16">
        <h2 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate">
          {title}
        </h2>
        {data && (
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6 rtl:space-x-reverse">
            {data.map((item) => (
              <div
                key={item.text}
                className={classNames(
                  locale === "ar" ? "text-lg" : "text-sm",
                  "mt-2 flex items-center dark:text-gray-300"
                )}
              >
                <item.Icon
                  className="flex-shrink-0 ltr:mr-1.5 rtl:ml-1.5 h-5 w-5 dark:text-gray-500"
                  aria-hidden="true"
                />
                {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
      {actions && (
        <div className="my-5 flex lg:mt-0 ltr:lg:ml-4 rtl:lg:mr-4 space-x-3 rtl:space-x-reverse">
          {actions.map((action) => (
            <span
              key={action.title}
              className={classNames(action.collapsible && "hidden sm:block")}
            >
              <button
                type={action.type || "button"}
                className={classNames(
                  action.type === "submit"
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-gray-600 hover:bg-gray-700",
                  "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                )}
              >
                <action.Icon
                  className="ltr:-ml-1 ltr:mr-2 rtl:-mr-1 rtl:ml-2 h-5 w-5 text-gray-300"
                  aria-hidden="true"
                />
                {action.title}
              </button>
            </span>
          ))}

          {/* Dropdown */}
          <Menu as="span" className="z-10 ltr:ml-3 rtl:mr-3 relative sm:hidden">
            <Menu.Button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
              <FormattedMessage defaultMessage="More" />
              <ChevronDownIcon
                className="ltr:-mr-1 ltr:ml-2 rtl:-ml-1 rtl:mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-left absolute ltr:left-0 rtl:right-0 mt-2 ltr:-ml-1 rtl:-mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {actions
                  .filter((action) => action.collapsible)
                  .map((action) => (
                    <Menu.Item key={action.title}>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active && "bg-gray-100",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {action.title}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default MetaAndActionsHeading;
