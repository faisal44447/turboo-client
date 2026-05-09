import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductCard from "../ProductCard/ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const res = await axiosSecure.get("/products");

                console.log("API RESPONSE:", res.data);

                const allProducts = res?.data?.products || [];

                setProducts(allProducts); // ✅ NO FILTER (safe)

            } catch (error) {
                console.log(error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [axiosSecure]);

    if (loading) return <p className="p-5">Loading...</p>;

    if (products.length === 0)
        return <p className="p-5">No products found 😢</p>;

    return (
        <div className="p-5">

            <h2 className="text-2xl font-bold mb-5">
                All Products ({products.length})
            </h2>

            <div className="grid md:grid-cols-3 gap-5">

                {products.map((p) => (
                    <ProductCard
                        key={p?._id}
                        product={p}
                    />
                ))}

            </div>

        </div>
    );
};

export default Products;