import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useState } from "react";
import { classNames } from "utils";

interface IBannerAction {
  title: string;
  link: string;
}
interface IFloatingTopBanner {
  message: string;
  shortMessage: string;
  action?: IBannerAction;
}

const FloatingTopBanner = ({
  message,
  shortMessage,
  action,
}: IFloatingTopBanner) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className={classNames(
        isVisible ? "" : "hidden",
        "fixed bottom-0 inset-x-0 pb-2 sm:pb-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-indigo-800">
                <SpeakerphoneIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ltr:ml-3 rtl:mr-3 font-medium text-white truncate">
                <span className="md:hidden">{shortMessage}</span>
                <span className="hidden md:inline">{message}</span>
              </p>
            </div>

            {action && (
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <Link href={action.link}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    {action.title}
                  </a>
                </Link>
              </div>
            )}

            <div className="order-2 flex-shrink-0 sm:order-3 ltr:sm:ml-2 rtl:sm:mr-2">
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="ltr:-mr-1 rtl:-ml-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingTopBanner;
