// layouts
import { MainLayout, ProductCartLayout } from "~/layout";

// pages
import Home from "./Home";
import AllProducts from "./AllProducts";
import Login from "./Login";
import SignUp from "./SignUp";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import Purchase from "./Purchase";

// if layout is null, page will use `EmptyLayout` in ~/layout
const pages = [
  {
    path: ["/", "/home"],
    content: Home,
    layout: MainLayout,
  },
  {
    path: ["/all-products", "/:name/c/:category_id", "/search"],
    content: AllProducts,
    layout: MainLayout,
  },
  { path: "/login", content: Login },
  { path: "/signup", content: SignUp },
  { path: "/cart", content: Cart, layout: ProductCartLayout },
  { path: "/purchase", content: Purchase, layout: ProductCartLayout },
  {
    path: "/:name/p/:product_id",
    content: SingleProduct,
    layout: ProductCartLayout,
  },
];

export default pages;
