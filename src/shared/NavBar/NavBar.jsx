import { Link } from "react-router-dom";
import turbooLogo from "../../assets/turbooLogo.png";

const Navbar = () => {

    const navOptions = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/add-product">Add Product</Link></li>
            <li><Link to="/orders">Orders</Link></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-4">

            {/* LEFT */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {navOptions}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-xl">
                    <img className="w-20 -mt-5"
                        src={turbooLogo} alt="" />
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end">
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Navbar;