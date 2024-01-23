import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
