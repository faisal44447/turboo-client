import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

const UpdateProduct = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const axiosPublic = useAxiosPublic();

    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState(null);

    const [country, setCountry] = useState("");


    // ================= FLAG =================

    const getFlag = (countryName) => {

        if (!countryName) return "🌍";

        const code =
            countries.getAlpha2Code(
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


    // ================= FETCH PRODUCT =================

    const fetchProduct = async () => {

        try {

            const res =
                await axiosSecure.get(
                    `/products/${id}`
                );

            setProduct(res.data);

            setCountry(res.data?.country);

        } catch (error) {

            console.log(error);
        }
    };


    useEffect(() => {

        fetchProduct();

    }, [id]);


    // ================= IMAGE UPLOAD =================

    const uploadImage = async (file) => {

        const formData = new FormData();

        formData.append("image", file);

        const res =
            await axiosPublic.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
                formData
            );

        return res.data.data.display_url;
    };


    // ================= UPDATE PRODUCT =================

    const handleUpdate = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const form = e.target;

            let imageUrl = product?.image;

            const imageFile =
                form.image.files[0];

            // NEW IMAGE
            if (imageFile) {

                imageUrl =
                    await uploadImage(
                        imageFile
                    );
            }


            const updatedProduct = {

                name: form.name.value,

                details:
                    form.details.value,

                price: Number(
                    form.price.value
                ),

                phone: form.phone.value,

                country,

                flag: getFlag(country),

                image: imageUrl,
            };


            const res =
                await axiosSecure.put(
                    `/products/${id}`,
                    updatedProduct
                );


            if (
                res.data.modifiedCount > 0
            ) {

                Swal.fire(
                    "Success",
                    "Product Updated Successfully",
                    "success"
                );

                navigate("/products");
            }

        } catch (error) {

            console.log(error);

            Swal.fire(
                "Error",
                "Update failed",
                "error"
            );

        } finally {

            setLoading(false);
        }
    };


    if (!product) {

        return (
            <div className="p-10 text-center">
                Loading...
            </div>
        );
    }


    return (
        <div className="max-w-2xl mx-auto p-5">

            <div className="bg-white shadow-xl rounded-2xl p-6 border">

                <h2 className="text-3xl font-bold mb-6 text-center">

                    Update Product

                </h2>


                <form
                    onSubmit={handleUpdate}
                    className="space-y-4"
                >

                    {/* NAME */}
                    <input
                        type="text"
                        name="name"
                        defaultValue={
                            product?.name
                        }
                        placeholder="Product Name"
                        className="input input-bordered w-full"
                        required
                    />


                    {/* DETAILS */}
                    <textarea
                        name="details"
                        defaultValue={
                            product?.details
                        }
                        placeholder="Details"
                        className="textarea textarea-bordered w-full"
                        required
                    />


                    {/* PRICE */}
                    <input
                        type="number"
                        name="price"
                        defaultValue={
                            product?.price
                        }
                        placeholder="Price"
                        className="input input-bordered w-full"
                        required
                    />


                    {/* PHONE */}
                    <input
                        type="text"
                        name="phone"
                        defaultValue={
                            product?.phone
                        }
                        placeholder="Phone"
                        className="input input-bordered w-full"
                        required
                    />


                    {/* COUNTRY */}
                    <input
                        type="text"
                        value={country}
                        onChange={(e) =>
                            setCountry(
                                e.target.value
                            )
                        }
                        placeholder="Country"
                        className="input input-bordered w-full"
                        required
                    />


                    {/* FLAG */}
                    <div className="text-center text-2xl">

                        {getFlag(country)}{" "}

                        {country}

                    </div>


                    {/* IMAGE */}
                    <input
                        type="file"
                        name="image"
                        className="file-input file-input-bordered w-full"
                    />


                    {/* OLD IMAGE */}
                    <img
                        src={product?.image}
                        alt="product"
                        className="w-40 h-40 object-cover rounded-xl mx-auto"
                    />


                    {/* BUTTON */}
                    <button
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >

                        {loading
                            ? "Updating..."
                            : "Update Product"}

                    </button>

                </form>

            </div>

        </div>
    );
};

export default UpdateProduct;