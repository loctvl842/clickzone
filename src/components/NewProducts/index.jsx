import styles from "./style.module.scss";
import classNames from "classnames/bind";

// libraries
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByPage, selectAllProducts } from "~/store/productSlice";
import { useLocation } from "react-router-dom";

// components
import { ProductCard } from "~/components";

// utils
import { initArray } from "~/util";

let cx = classNames.bind(styles);

const NewProducts = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const products = useSelector((state) => selectAllProducts(state));
  const productStatus = useSelector((state) => state.product.status);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page") ?? 0;
    const sort = params.get("sort") ?? 0;
    dispatch(fetchProductsByPage({ sort, page }));
  }, [dispatch, location]);

  return (
    <div className={cx("container")}>
      <div className={cx("product-list")}>
        {products &&
          products.map((p) => (
            <div key={uuidv4()} className={cx("product-item")}>
              <ProductCard product={p} />
            </div>
          ))}
        {productStatus === "loading" &&
          initArray(import.meta.env.VITE_PAGE_SIZE).map(() => (
            <div key={uuidv4()} className={cx("product-item")}>
              <ProductCard.Loading />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewProducts;
