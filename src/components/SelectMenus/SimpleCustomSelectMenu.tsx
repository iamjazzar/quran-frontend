import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { classNames } from "utils";
import { NextRouter, useRouter } from "next/router";

interface IData {
  key: string;
  text: string;
}

interface ILanguageSelector {
  data: IData[];
  label?: string;
  labelVisible?: boolean;
  initialSelected?: (values: IData[]) => IData | undefined;
  onChange?: (value: string, router: NextRouter) => void;
}

const SimpleCustomSelectMenu = ({
  data,
  label,
  initialSelected,
  onChange = () => {},
  labelVisible = true,
}: ILanguageSelector) => {
  const router = useRouter();
  const [selected, setSelected] = useState<IData>(data[0]);
  console.log(selected);

  const onSelectionChange = (value: IData) => {
    setSelected(value);
    onChange(value.key, router);
  };

  useEffect(() => {
    if (initialSelected) {
      const obj = initialSelected(data);
      setSelected(obj || data[0]);
    }
  }, [router]);

  return (
    <Listbox value={selected} onChange={onSelectionChange}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label
              className={classNames(
                labelVisible ? "" : "sr-only",
                "block text-sm font-medium text-gray-400 dark:text-gray-700"
              )}
            >
              {label}
            </Listbox.Label>
          )}
          <div className="mt-1 relative">
            <Listbox.Button className="appearance-none relative w-full bg-none bg-white dark:bg-gray-700 border dark:border-2 border-gray-300 dark:border-transparent rounded-md block py-2 ltr:pl-3 rtl:pr-3 ltr:pr-10 rtl:pl-10 text-base ltr:text-left rtl:text-right cursor-default text-gray-500 dark:text-white focus:outline-none focus:ring-1 dark:focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.text}</span>
              <span className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center ltr:pr-2 rtl:pl-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400 dark:text-gray-200"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {data.map((datum: IData) => (
                  <Listbox.Option
                    key={datum.key}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 ltr:pl-3 rtl:pr-3 ltr:pr-9 rtl:pl-9"
                      )
                    }
                    value={datum}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {datum.text}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center ltr:pr-4 rtl:pl-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SimpleCustomSelectMenu;
