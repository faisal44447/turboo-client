import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProductCard from "./ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const res = await axiosSecure.get("/products");

                // SAFE ACCESS
                const allProducts = res?.data?.products || [];

                // filter stock products
                const stockProducts = allProducts.filter(
                    (p) => p?.status === "stock"
                );

                setProducts(stockProducts);

            } catch (err) {
                console.log(err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [axiosSecure]);

    if (loading) {
        return (
            <div className="p-5 text-center">
                Loading products...
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="p-5 text-center">
                No products found 😢
            </div>
        );
    }

    return (
        <div className="p-5">

            <h2 className="text-2xl font-bold mb-4">
                Products ({products.length})
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