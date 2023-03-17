// layouts
import { MainLayout, EmptyLayout } from "~/layout";

// pages
import Home from "~/pages/Home";
import AllProducts from "~/pages/AllProducts";
import Login from "~/pages/Login";

const pages = [
  {
    path: ["/", "/home"],
    components: <Home />,
    layout: MainLayout,
  },
  { path: "/all-products", components: <AllProducts />, layout: MainLayout },
  { path: "/login", components: <Login /> },
];

export default pages;
