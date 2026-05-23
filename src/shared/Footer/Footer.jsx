import {
    FaSquareFacebook,
    FaSquareTwitter,
    FaInstagram,
} from "react-icons/fa6";

const Footer = () => {

    return (

        <footer className="bg-black text-white mt-20">

            <div className="max-w-7xl mx-auto px-5 py-12">

                <div className="grid md:grid-cols-3 gap-10">

                    {/* LOGO */}
                    <div>

                        <h2 className="text-4xl font-bold text-yellow-400">

                            Turboo

                        </h2>

                        <p className="mt-4 text-gray-400 leading-7">

                            Premium bike accessories,
                            helmets, lights, exhausts,
                            riding gear and more.

                        </p>

                    </div>


                    {/* SOCIAL LINKS */}
                    <div>

                        <h3 className="text-2xl font-bold mb-5">

                            Follow Us

                        </h3>

                        <ul className="space-y-4 text-gray-400">

                            <li className="flex items-center gap-3 hover:text-blue-500 transition">

                                <FaSquareFacebook className="text-2xl" />

                                Facebook

                            </li>


                            <li className="flex items-center gap-3 hover:text-sky-400 transition">

                                <FaSquareTwitter className="text-2xl" />

                                Twitter

                            </li>


                            <li className="flex items-center gap-3 hover:text-pink-500 transition">

                                <FaInstagram className="text-2xl" />

                                Instagram

                            </li>

                        </ul>

                    </div>


                    {/* CONTACT */}
                    <div>

                        <h3 className="text-2xl font-bold mb-5">

                            Contact

                        </h3>

                        <div className="space-y-3 text-gray-400">

                            <p>
                                📍 Dhaka, Bangladesh
                            </p>

                            <p>
                                📞 +880123456789
                            </p>

                            <p>
                                ✉️ ashiq642.ai@gmail.com
                            </p>

                        </div>

                    </div>

                </div>


                {/* BOTTOM */}
                <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-500">

                    © {new Date().getFullYear()} Turboo Shop.
                    All Rights Reserved.

                </div>

            </div>

        </footer>
    );
};

export default Footer;