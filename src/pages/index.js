// layouts
import { MainLayout } from "~/layout";

// pages
import Home from "~/pages/Home";
import AllProducts from "~/pages/AllProducts";
import Login from "~/pages/Login";
import SignUp from "~/pages/SignUp";
import SingleProduct from "~/pages/SingleProduct";
import Cart from "~/pages/Cart";

// if layout is null, page will use `EmptyLayout` in ~/layout
const pages = [
  {
    path: ["/", "/home"],
    components: <Home />,
    layout: MainLayout,
  },
  { path: "/all-products", components: <AllProducts />, layout: MainLayout },
  { path: "/login", components: <Login /> },
  { path: "/signup", components: <SignUp /> },
  { path: "/:name/:productId", components: <SingleProduct />, layout: MainLayout },
  { path: "/cart", components: <Cart />, layout: MainLayout },
];

export default pages;
