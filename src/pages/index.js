import { MainLayout, EmptyLayout } from "~/layout";
import Home from "~/pages/Home";
import AllProducts from "~/pages/AllProducts";

const pages = [
  {
    path: ["/", "/home"],
    components: <Home />,
    layout: MainLayout,
  },
  { path: "/all-products", components: <AllProducts />, layout: MainLayout },
  // { path: "/login", element: <Login /> },
];

export default pages;
