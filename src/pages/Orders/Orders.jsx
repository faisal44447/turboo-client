import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Orders = () => {

    const axiosSecure = useAxiosSecure();

    const [orders, setOrders] = useState([]);


    // FETCH ORDERS
    const fetchOrders = async () => {

        try {

            const res = await axiosSecure.get(
                "/orders"
            );

            setOrders(
                res?.data?.orders || []
            );

        } catch (error) {

            console.log(error);
        }
    };


    useEffect(() => {

        fetchOrders();

    }, []);


    // DELETE ORDER
    const handleDelete = async (id) => {

        try {

            const confirm =
                await Swal.fire({
                    title: "Are you sure?",
                    text: "Order will be deleted",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes Delete",
                });

            if (confirm.isConfirmed) {

                const res =
                    await axiosSecure.delete(
                        `/orders/${id}`
                    );

                if (res.data.deletedCount > 0) {

                    Swal.fire(
                        "Deleted",
                        "Order deleted successfully",
                        "success"
                    );

                    fetchOrders();
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
        <div className="p-5">

            <h2 className="text-3xl font-bold mb-5">

                Orders ({orders.length})

            </h2>


            <div className="overflow-x-auto">

                <table className="table table-zebra">

                    <thead>

                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Customer Phone</th>
                            <th>Seller Phone</th>
                            <th>Action</th>
                        </tr>

                    </thead>


                    <tbody>

                        {orders.map(
                            (order, index) => (

                                <tr
                                    key={order?._id}
                                >

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>

                                        <img
                                            src={
                                                order?.productImage
                                            }
                                            alt="product"
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />

                                    </td>

                                    <td>
                                        {order?.productName}
                                    </td>

                                    <td>
                                        ৳ {order?.price}
                                    </td>

                                    <td>
                                        {
                                            order?.customerPhone
                                        }
                                    </td>

                                    <td>
                                        {
                                            order?.sellerPhone
                                        }
                                    </td>

                                    <td>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    order?._id
                                                )
                                            }
                                            className="btn btn-error btn-sm text-white"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Orders;