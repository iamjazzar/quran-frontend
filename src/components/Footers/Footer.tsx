import { NextComponentType } from "next";
import { FormattedMessage, useIntl } from "react-intl";
import SimpleCustomSelectMenu from "components/SelectMenus/SimpleCustomSelectMenu";
import { switchLanguage } from "utils";
import Link from "next/link";
import paths from "utils/paths";
import GithubIcon from "components/SVGs/GithubIcon";
import TwitterIcon from "components/SVGs/TwitterIcon";
import InstagramIcon from "components/SVGs/InstagramIcon";
import FacebookIcon from "components/SVGs/FacebookIcon";
import { useRouter } from "next/router";

const Footer: NextComponentType = () => {
  const { formatMessage } = useIntl();
  const { locale } = useRouter();

  const navigation = {
    solutions: [
      { name: formatMessage({ defaultMessage: "Analytics" }), href: "#" },
      { name: formatMessage({ defaultMessage: "Insights" }), href: "#" },
      { name: formatMessage({ defaultMessage: "Marketing" }), href: "#" },
    ],
    support: [
      { name: formatMessage({ defaultMessage: "Documentation" }), href: "#" },
      { name: formatMessage({ defaultMessage: "Guides" }), href: "#" },
      { name: formatMessage({ defaultMessage: "API Status" }), href: "#" },
    ],
    us: [
      { name: formatMessage({ defaultMessage: "About" }), href: "#" },
      { name: formatMessage({ defaultMessage: "Blog" }), href: "#" },
      { name: formatMessage({ defaultMessage: "Jobs" }), href: "#" },
      { name: formatMessage({ defaultMessage: "Press" }), href: "#" },
      { name: formatMessage({ defaultMessage: "Partners" }), href: "#" },
    ],
    legal: [
      { name: formatMessage({ defaultMessage: "Attributions" }), href: "#" },
      { name: formatMessage({ defaultMessage: "Cookies" }), href: "#" },
      { name: formatMessage({ defaultMessage: "Privacy" }), href: "#" },
      { name: formatMessage({ defaultMessage: "Terms" }), href: "#" },
    ],
    social: [
      {
        name: "Facebook",
        href: "#",
        icon: FacebookIcon,
      },
      {
        name: "Instagram",
        href: "#",
        icon: InstagramIcon,
      },
      {
        name: "Twitter",
        href: "#",
        icon: TwitterIcon,
      },
      {
        name: "GitHub",
        href: paths.github,
        icon: GithubIcon,
      },
    ],
  };

  return (
    <footer
      className="lg:border-t lg:border-slate-900/10 dark:border-slate-50/[0.2]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        <FormattedMessage defaultMessage="Fasl Footer" />
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 divide-y lg:divide-slate-900/10 dark:divide-slate-50/[0.06]">
        <div className="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-4">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  <FormattedMessage defaultMessage="Solutions" />
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  <FormattedMessage defaultMessage="Support" />
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  <FormattedMessage defaultMessage="Website" />
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.us.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  <FormattedMessage defaultMessage="Legal" />
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              <FormattedMessage defaultMessage="Language & Riwaya" />
            </h3>
            <form className="mt-4 sm:max-w-xs">
              <SimpleCustomSelectMenu
                labelVisible={false}
                label={formatMessage({ defaultMessage: "Language" })}
                onChange={switchLanguage}
                initialSelected={(values) =>
                  values.find((obj) => obj.key === locale)
                }
                data={[
                  { key: "ar", text: "العربية" },
                  { key: "en", text: "English" },
                ]}
              />
              <SimpleCustomSelectMenu
                labelVisible={false}
                label={formatMessage({ defaultMessage: "Riwaya" })}
                data={[
                  {
                    key: "hafs",
                    text: formatMessage({ defaultMessage: "Hafs A'n Asim" }),
                  },
                  {
                    key: "warsh",
                    text: formatMessage({ defaultMessage: "Warsh A'n Nafi'" }),
                  },
                ]}
              />
            </form>
          </div>
        </div>
        <div className="pt-8 lg:flex lg:items-center lg:justify-between xl:mt-0">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              <FormattedMessage defaultMessage="Subscribe to our newsletter" />
            </h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
              <FormattedMessage defaultMessage="The latest news, articles, and resources, sent to your inbox weekly.newsletter" />
            </p>
          </div>
          <form className="mt-4 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              <FormattedMessage defaultMessage="Email address" />
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="appearance-none min-w-0 w-full bg-white border border-gray-300 dark:border-transparent rounded-md py-2 px-4 text-base dark:text-gray-900 dark:placeholder-gray-500 focus:outline-none dark:focus:ring-2 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-white dark:focus:border-white focus:placeholder-gray-400 sm:max-w-xs"
              placeholder={formatMessage({
                defaultMessage: "Enter your email",
              })}
            />
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 rtl:sm:mr-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full bg-indigo-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              >
                <FormattedMessage defaultMessage="Subscribe" />
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 rtl:space-x-reverse md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            <span>&copy;</span>{" "}
            <FormattedMessage
              defaultMessage="Copyright {year, date, ::yyyy}"
              values={{ year: new Date() }}
            />{" "}
            <Link href={paths.home}>
              <a className="hover:underline">
                <FormattedMessage defaultMessage="Fasl" />
              </a>
            </Link>
            <FormattedMessage defaultMessage=". All Rights Reserved." />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
