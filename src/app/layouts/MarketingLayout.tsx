import { Outlet } from "react-router-dom";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";

/** Public marketing shell: floating Navbar over the page + Footer. */
export default function MarketingLayout() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
