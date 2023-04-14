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
    content: Home,
    layout: MainLayout,
  },
  { path: "/all-products", content: AllProducts, layout: MainLayout },
  { path: "/login", content: Login },
  { path: "/signup", content: SignUp },
  { path: "/:name/:productId", content: SingleProduct, layout: MainLayout },
  { path: "/cart", content: Cart, layout: MainLayout },
];

export default pages;
