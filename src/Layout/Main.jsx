import { Outlet } from "react-router-dom";
import Navbar from '../shared/NavBar/NavBar';
import Footer from "../shared/Footer/Footer";



const Main = () => {

  return (

    <div>

      {/* NAVBAR */}
      <div className="bg-white shadow-md">

        <Navbar />

      </div>


      {/* PAGE */}
      <div className="max-w-7xl mx-auto px-4 min-h-screen">

        <Outlet />

      </div>


      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Main;