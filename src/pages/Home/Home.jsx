import { motion } from "framer-motion";
import homeLogo from "../../assets/homeLogo.PNG";

const Home = () => {
    return (
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">

            {/* Center Text */}
            <h1 className="absolute text-3xl md:text-5xl font-bold z-10 text-center -top-2">
                Welcome to Turboo
            </h1>

            {/* Moving Image (right → left full screen) */}
            <motion.img
                src={homeLogo}
                alt="Turboo Logo"
                className="w-[80px] md:w-[200px] absolute top-8 -translate-y-1/2"
                initial={{ x: "100vw" }}   // ডান পাশের বাইরে থেকে শুরু
                animate={{ x: "-100vw" }}  // বাম পাশের বাইরে গিয়ে শেষ
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

        </div>
    );
};

export default Home;