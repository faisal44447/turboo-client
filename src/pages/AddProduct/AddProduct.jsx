import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

const AddProduct = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState("");

    // 🌍 FLAG
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

    // image upload
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axiosPublic.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
            formData
        );

        return res.data.data.display_url;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const form = e.target;
            const imageFile = form.image.files[0];

            if (!imageFile) {
                return Swal.fire("Error", "Image required", "error");
            }

            const imageUrl = await uploadImage(imageFile);

            const productData = {
                name: form.name.value,
                details: form.details.value,
                price: Number(form.price.value),
                phone: form.phone.value,
                image: imageUrl,
                country,
                flag: getFlag(country),
                createdAt: new Date(),
            };

            const res = await axiosSecure.post("/products", productData);

            if (res.status === 200 || res.status === 201) {
                Swal.fire("Success", "Product Added Successfully", "success");
                form.reset();
                setCountry("");
                navigate("/products");
            }

        } catch (error) {
            Swal.fire("Error", "Failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="p-6 space-y-4">
            <div className="border">
                <input name="name" className="input" placeholder="Name" required />
            </div>
            <div className="border">
                <textarea name="details" className="textarea" placeholder="Details" required />
            </div>
            <div className="border">
                <input name="price" type="number" className="input" placeholder="Price" required />
            </div>
            <div className="border">
                <input name="phone" className="input" placeholder="Phone" required />
            </div>
            <div className="border">
                <input
                name="country"
                className="input"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
            />
            </div>

            {country && (
                <p className="text-xl text-center">
                    {getFlag(country)} {country}
                </p>
            )}

            <input name="image" type="file" className="file-input w-full" required />

            <button className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Uploading..." : "Add Product"}
            </button>
        </form>
    );
};

export default AddProduct;