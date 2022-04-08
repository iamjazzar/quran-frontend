import { SearchIcon } from "@heroicons/react/outline";
import SearchPalette from "components/Search/SearchPalette";
import { useCallback, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const SearchButton = () => {
  const { formatMessage } = useIntl();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = useCallback((event) => {
    if (event.metaKey && event.key === "k") {
      setIsSearching((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleSearch, false);

    return () => {
      document.removeEventListener("keydown", handleSearch, false);
    };
  }, []);

  return (
    <div className="w-full sm:max-w-xs">
      <div className="w-full flex-row sm:max-w-xs">
        <label htmlFor="search" className="sr-only">
          <FormattedMessage defaultMessage="Search" />
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 flex items-center ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            onClick={() => setIsSearching(true)}
            id="search"
            name="search"
            className="light:focus:ring-1 block w-full cursor-text rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-500 focus:border-indigo-500 focus:text-gray-400 focus:outline-none focus:ring-indigo-500 ltr:pl-10 ltr:pr-3 ltr:text-left rtl:pr-10 rtl:pl-3 rtl:text-right dark:border-transparent dark:bg-slate-700 dark:text-gray-400 dark:focus:border-white dark:focus:bg-white dark:focus:placeholder-gray-500 dark:focus:ring-white"
            value={formatMessage({
              defaultMessage: "search",
            })}
            type="button"
          />
          <div className="absolute inset-y-0 flex py-1.5 ltr:right-0 ltr:pr-1.5 rtl:left-0 rtl:pl-1.5">
            <kbd
              dir="ltr"
              className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-500 dark:border-gray-400 dark:text-gray-400"
            >
              ⌘K
            </kbd>
          </div>
        </div>
        <SearchPalette isOpen={isSearching} onDismiss={setIsSearching} />
      </div>
    </div>
  );
};

export default SearchButton;
