import { useState } from "react";

const ProductCard = ({ product }) => {
    const [showMore, setShowMore] = useState(false);

    // 🌍 FLAG GENERATOR (FIXED)
    const getFlag = (countryName) => {
        if (!countryName) return "🌍";

        const code = countries.getAlpha2Code(countryName.trim(), "en");

        if (!code) return "🌍";

        return code
            .toUpperCase()
            .replace(/./g, char =>
                String.fromCodePoint(127397 + char.charCodeAt())
            );
    };

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">

            {/* IMAGE */}
            <figure className="relative bg-base-200">

                <img
                    src={product?.image || "https://via.placeholder.com/300"}
                    alt={product?.name || "product"}
                    className="w-full h-60 object-contain p-4"
                />

                {/* PRICE */}
                <div className="absolute top-3 right-3">
                    <span className="badge bg-green-500 text-white font-bold text-lg">
                        ৳ {product?.price}
                    </span>
                </div>

            </figure>

            {/* BODY */}
            <div className="card-body">

                {/* TITLE */}
                <h2 className="card-title text-lg font-bold">
                    {product?.name}
                </h2>

                {/* COUNTRY + FLAG */}
                <p className="flex items-center gap-2 text-red-600 font-semibold">
                    <span className="text-2xl">
                        {product?.flag || getFlag(product?.country)}
                    </span>

                    <span>
                        {product?.country || "Unknown"}
                    </span>
                </p>

                {/* DETAILS */}
                <p className="text-gray-500 text-sm">

                    {showMore
                        ? product?.details
                        : product?.details?.slice(0, 80) + "..."
                    }

                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="text-blue-500 ml-2 font-medium"
                    >
                        {showMore ? "See Less" : "See More"}
                    </button>

                </p>

                {/* PHONE */}
                <div className="flex items-center gap-2 text-gray-600 font-medium">

                    <span className="text-green-500 text-lg">📞</span>

                    <span>{product?.phone}</span>

                </div>

                {/* BUTTON */}
                <div className="card-actions mt-3">

                    <a
                        href={`tel:${product?.phone}`}
                        className="btn w-full bg-green-500 text-white hover:bg-green-600 transition-all"
                    >
                        Order Now
                    </a>

                </div>

            </div>

        </div>
    );
};

export default ProductCard;