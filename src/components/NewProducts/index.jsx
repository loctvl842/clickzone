import styles from "./style.module.scss";
import classNames from "classnames/bind";

// libraries
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByPage, selectAllProducts } from "~/store/productSlice";

// components
import { ProductCard } from "~/components";

// utils
import { initArray } from "~/util";
import { useQuery } from "~/hook";

let cx = classNames.bind(styles);

const NewProducts = ({ category_id }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => selectAllProducts(state));
  const productStatus = useSelector((state) => state.product.status);
  const query = useQuery();

  useEffect(() => {
    const sort = query.get("sort") ?? 0;
    const page = query.get("page") ?? 0;
    const search_query = query.get("query");
    dispatch(fetchProductsByPage({ sort, page, category_id, search_query }));
  }, [dispatch, query, category_id]);

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
