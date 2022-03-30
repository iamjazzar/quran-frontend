import FloatingTopBanner from "components/Banners/FloatingTopBanner";
import Footer from "components/Footers/Footer";
import Navbar from "components/Navbars/Navbar";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { classNames } from "utils";
import paths from "utils/paths";

const Layout: NextComponentType = ({ children }) => {
  const { locale } = useRouter();
  const { formatMessage } = useIntl();
  return (
    <div
      className={classNames(
        locale === "ar" ? "font-arabicSans text-lg" : "font-sans"
      )}
    >
      <div>
        <Navbar />
        <main className="px-2 sm:px-4 lg:px-8 py-8 max-w-7xl mx-auto">
          {children}
        </main>
        <FloatingTopBanner
          message={formatMessage({
            defaultMessage:
              "This website is still in beta version. If you face any issue please drop us a note.",
          })}
          shortMessage={formatMessage({
            defaultMessage: "We are beta!",
          })}
          action={{
            link: paths.github,
            title: formatMessage({
              defaultMessage: "GitHub",
            }),
          }}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
