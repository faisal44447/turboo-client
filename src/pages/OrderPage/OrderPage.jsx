import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const OrderPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const [product, setProduct] = useState(null);


    // FETCH PRODUCT
    const fetchProduct = async () => {

        try {

            const res = await axiosSecure.get(
                `/products/${id}`
            );

            setProduct(res.data);

        } catch (error) {

            console.log(error);
        }
    };


    useEffect(() => {

        fetchProduct();

    }, [id]);


    // HANDLE ORDER
    const handleOrder = async (e) => {

        e.preventDefault();

        const form = e.target;

        const customerPhone =
            form.customerPhone.value;


        const orderData = {

            productId: product?._id,

            productName: product?.name,

            productImage: product?.image,

            price: product?.price,

            sellerPhone: product?.phone,

            customerPhone,

            createdAt: new Date(),
        };


        try {

            const res = await axiosSecure.post(
                "/orders",
                orderData
            );

            if (res.data.insertedId) {

                Swal.fire(
                    "Success",
                    "Order placed successfully",
                    "success"
                );

                navigate("/orders");
            }

        } catch (error) {

            console.log(error);

            Swal.fire(
                "Error",
                "Order failed",
                "error"
            );
        }
    };


    if (!product) {

        return (
            <div className="p-5 text-center">
                Loading...
            </div>
        );
    }


    return (
        <div className="max-w-xl mx-auto p-5">

            <div className="card bg-base-100 shadow-xl border">

                <figure>

                    <img
                        src={product?.image}
                        alt="product"
                        className="h-60 w-full object-cover"
                    />

                </figure>


                <div className="card-body">

                    <h2 className="card-title text-2xl">

                        {product?.name}

                    </h2>


                    <p className="font-bold text-lg">

                        ৳ {product?.price}

                    </p>


                    <p>

                        {product?.details}

                    </p>


                    <form
                        onSubmit={handleOrder}
                        className="space-y-4 mt-4"
                    >

                        <input
                            type="text"
                            name="customerPhone"
                            placeholder="Your Phone Number"
                            className="input input-bordered w-full"
                            required
                        />


                        <button className="btn btn-success w-full text-white">

                            Confirm Order

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default OrderPage;