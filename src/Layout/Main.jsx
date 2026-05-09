import { Outlet } from "react-router-dom";
import Navbar from "../shared/NavBar/NavBar";

const Main = () => {
  return (
    <div>
      <div className="bg-white shadow-md mt-10 mb-5">
        <Navbar />
      </div>
      <div className=" mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;