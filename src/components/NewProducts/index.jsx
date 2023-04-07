import styles from "./style.module.scss";
import classNames from "classnames/bind";

// libraries
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByPage, selectAllProducts } from "~/store/productSlice";
import { useLocation } from "react-router-dom";

// components
import { ProductCard, Paginator } from "~/components";

// icons
import { AddCircle } from "@mui/icons-material";

// modals
import { modals } from "~/modal";
import ProductForm, { modal_type } from "~/modal/ProductForm";
import { modalOpen } from "~/store/modalSlice";

let cx = classNames.bind(styles);

const NewProducts = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const products = useProducts();
  const products = useSelector((state) => selectAllProducts(state));
  const productStatus = useSelector((state) => state.product.status);

  const { data: user } = useSelector((state) => state.user);

  const handleAddNewProductClick = () => {
    modals[modal_type] = <ProductForm />;
    dispatch(modalOpen(modal_type));
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page_number = params.get("page") ?? 0;
    dispatch(fetchProductsByPage(page_number));
  }, [dispatch, productStatus, location]);

  return (
    <div className={cx("container")}>
      <div className={cx("product-list")}>
        {user && user.is_admin ? (
          <div className={cx("product-item")}>
            <div className={cx("new-product-btn")}>
              <div className={cx("add-btn-wrapper")}>
                <div className={cx("add-btn")} onClick={handleAddNewProductClick}>
                  <AddCircle style={{ fontSize: 100, userSelect: "none" }} />
                </div>
              </div>
              <div className={cx("fake-product-item")}>
                <span className={cx("fake-img-wrapper")}></span>
                <p className={cx("fake-price-sale")}></p>
                <span className={cx("fake-name")}></span>
              </div>
            </div>
          </div>
        ) : null}
        {products &&
          products.map((p) => (
            <div key={uuidv4()} className={cx("product-item")}>
              <ProductCard product={p} />
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
