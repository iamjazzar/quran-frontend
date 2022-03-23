import Footer from "components/Footers/Footer";
import Navbar from "components/Navbars/Navbar";
import { NextComponentType } from "next";

const Layout: NextComponentType = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <main className="px-2 sm:px-4 lg:px-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
