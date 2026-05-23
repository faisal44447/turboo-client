import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import useAxiosSecure from "../../hooks/useAxiosSecure";

countries.registerLocale(en);

const ProductCard = ({ product, refetch }) => {
    const [showMore, setShowMore] = useState(false);

    const axiosSecure = useAxiosSecure();

    // FLAG
    const getFlag = (countryName) => {
        if (!countryName) return "🌍";

        const code = countries.getAlpha2Code(
            countryName.trim(),
            "en"
        );

        if (!code) return "🌍";

        return code
            .toUpperCase()
            .replace(/./g, char =>
                String.fromCodePoint(
                    127397 + char.charCodeAt()
                )
            );
    };

    // DELETE PRODUCT
    const handleDelete = async () => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "This product will be deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes Delete",
            });

            if (confirm.isConfirmed) {

                const res = await axiosSecure.delete(
                    `/products/${product?._id}`
                );

                if (res.data.deletedCount > 0) {

                    Swal.fire(
                        "Deleted!",
                        "Product deleted successfully",
                        "success"
                    );

                    refetch && refetch();
                }
            }

        } catch (error) {
            console.log(error);

            Swal.fire(
                "Error",
                "Delete failed",
                "error"
            );
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">

            {/* IMAGE */}
            <figure className="relative bg-base-200">

                <img
                    src={
                        product?.image ||
                        "https://via.placeholder.com/300"
                    }
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

                {/* COUNTRY */}
                <p className="flex items-center gap-2 text-red-600 font-semibold">

                    <span className="text-2xl">
                        {product?.flag ||
                            getFlag(product?.country)}
                    </span>

                    <span>
                        {product?.country || "Unknown"}
                    </span>

                </p>

                {/* DETAILS */}
                <p className="text-gray-500 text-sm">

                    {showMore
                        ? product?.details
                        : product?.details?.slice(0, 80) + "..."}

                    <button
                        onClick={() =>
                            setShowMore(!showMore)
                        }
                        className="text-blue-500 ml-2 font-medium"
                    >
                        {showMore
                            ? "See Less"
                            : "See More"}
                    </button>

                </p>

                {/* PHONE */}
                <div className="flex items-center gap-2 text-gray-600 font-medium">

                    <span className="text-green-500 text-lg">
                        📞
                    </span>

                    <span>{product?.phone}</span>

                </div>

                {/* BUTTONS */}
                <div className="grid grid-cols-3 gap-2 mt-4">

                    <Link
                        to={`/order/${product?._id}`}
                        className="btn btn-success"
                    >
                        Order Now
                    </Link>

                    <Link
                        to={`/update-product/${product?._id}`}
                        className="btn btn-primary"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="btn bg-red-500 text-white hover:bg-red-600"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductCard;