import { DefaultLayout } from "~/layout";
import Home from "~/pages/Home";
import AllProducts from "~/pages/AllProducts";

const pages = [
  {
    path: ["/", "/home"],
    components: <Home />,
    layout: DefaultLayout,
  },
  { path: "/all-products", components: <AllProducts />, layout: DefaultLayout },
  // { path: "/login", element: <Login /> },
];

export default pages;
