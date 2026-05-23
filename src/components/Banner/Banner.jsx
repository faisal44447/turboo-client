import { Link } from "react-router-dom";

import {
    FaMotorcycle,
    FaHelmetSafety,
    FaWrench
} from "react-icons/fa6";

const Banner = () => {

    return (

        <div
            className="hero min-h-[85vh] rounded-3xl overflow-hidden"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format&fit=crop)"
            }}
        >

            {/* OVERLAY */}
            <div className="hero-overlay bg-black bg-opacity-75"></div>


            <div className="hero-content text-neutral-content text-center">

                <div className="max-w-4xl">


                    {/* TOP BADGE */}
                    <div className="mb-6 flex justify-center">

                        <div className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">

                            <FaMotorcycle />

                            Premium Bike Accessories

                        </div>

                    </div>


                    {/* TITLE */}
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">

                        Ride With <br />

                        <span className="text-yellow-400">

                            Power & Style

                        </span>

                    </h1>


                    {/* DESCRIPTION */}
                    <p className="text-lg md:text-xl text-gray-200 leading-8 mb-10 max-w-3xl mx-auto">

                        Discover premium bike accessories,
                        helmets, riding gear, lights,
                        exhausts, and performance parts
                        for every biker.

                        Upgrade your ride with the best
                        quality products.

                    </p>


                    {/* BUTTONS */}
                    <div className="flex flex-col md:flex-row gap-5 justify-center">

                        <Link
                            to="/products"
                            className="btn btn-warning text-lg px-10 py-3 rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
                        >

                            Explore Accessories

                        </Link>

                    </div>


                    {/* FEATURES */}
                    <div className="grid md:grid-cols-3 gap-5 mt-14">


                        {/* CARD 1 */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">

                            <div className="text-4xl text-yellow-400 mb-3 flex justify-center">

                                <FaHelmetSafety />

                            </div>

                            <h3 className="text-2xl font-bold mb-2">

                                Safety Gear

                            </h3>

                            <p className="text-gray-300">

                                Premium helmets, gloves,
                                jackets & riding protection.

                            </p>

                        </div>


                        {/* CARD 2 */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">

                            <div className="text-4xl text-yellow-400 mb-3 flex justify-center">

                                <FaWrench />

                            </div>

                            <h3 className="text-2xl font-bold mb-2">

                                Performance Parts

                            </h3>

                            <p className="text-gray-300">

                                Exhausts, LED lights,
                                chains, tires & tuning parts.

                            </p>

                        </div>


                        {/* CARD 3 */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">

                            <div className="text-4xl text-yellow-400 mb-3 flex justify-center">

                                <FaMotorcycle />

                            </div>

                            <h3 className="text-2xl font-bold mb-2">

                                Custom Accessories

                            </h3>

                            <p className="text-gray-300">

                                Stylish accessories to make
                                your bike stand out on roads.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Banner;