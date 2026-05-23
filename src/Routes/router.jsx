import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import AddProduct from "../pages/AddProduct/AddProduct";
import Products from "../pages/Products/Products";
import Orders from "../pages/Orders/Orders";
import OrderPage from "../pages/OrderPage/OrderPage";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "products", element: <Products /> },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "order/:id",
        element: <OrderPage />,
      },
    ],
  },
]);

export default router;