import { useEffect, useState } from "react";
import { NextComponentType } from "next";
import { useTheme } from "next-themes";
import { SunIcon } from "@heroicons/react/solid";
import { MoonIcon } from "@heroicons/react/outline";
import { classNames } from "../../utils";

const DarkModeButton: NextComponentType = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={classNames(
        theme === "system"
          ? "text-gray-300 bg-transparent hover:text-gray-400"
          : "text-sky-400 bg-transparent hover:text-sky-500",
        "inline-flex items-center p-1 border border-transparent rounded-full drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
      )}
    >
      {resolvedTheme === "dark" ? (
        <>
          <span className="sr-only">Disable dark mode</span>
          <MoonIcon className="h-6 w-6" aria-hidden="true" />
        </>
      ) : (
        <>
          <span className="sr-only">Disable dark mode</span>
          <SunIcon className="h-6 w-6" aria-hidden="true" />
        </>
      )}
    </button>
  );
};

export default DarkModeButton;
