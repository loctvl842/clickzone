import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { ProductCard, Paginator, AddProductButton } from "~/components";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByPage, selectAllProducts } from "~/store/productSlice";
import { useLocation } from "react-router-dom";

let cx = classNames.bind(styles);

const NewProducts = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const products = useProducts();
  const products = useSelector((state) => selectAllProducts(state));
  const productStatus = useSelector((state) => state.product.status);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page_number = params.get("page") ?? 0;
    dispatch(fetchProductsByPage(page_number));
  }, [dispatch, productStatus, location]);

  return (
    <div className={cx("container")}>
      <div className={cx("product-list")}>
        <AddProductButton />
        {products &&
          products.map((product) => (
            <div key={uuidv4()} className={cx("product-item")}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
      <center>
        <Paginator />
      </center>
    </div>
  );
};

export default NewProducts;
