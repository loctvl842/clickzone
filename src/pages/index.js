import Home from "./Home";
import Login from "./Login";
import AllProducts from "./AllProducts";

const pages = [
  { path: ["/", "/home"], element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/all-products", element: <AllProducts /> },
];

export default pages;
