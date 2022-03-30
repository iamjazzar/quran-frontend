import Footer from "components/Footers/Footer";
import Navbar from "components/Navbars/Navbar";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { classNames } from "utils";

const Layout: NextComponentType = ({ children }) => {
  const { locale } = useRouter();

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
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
