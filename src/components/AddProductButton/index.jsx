import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

// hook
import { useClickOutside } from "~/hook";

// components
import { ProductCreationForm } from "~/components";

// icons
import { AddCircle } from "@mui/icons-material";

let cx = classNames.bind(styles);

const AddProductButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [creatingProduct, setCreatingProduct] = useState(false);

  const formRef = useRef();
  const addBtnRef = useRef();

  const { data: user } = useSelector((state) => state.user);

  const handleAddNewProductClick = () => {
    setCreatingProduct(true);
  };

  const handleNotCreatingProduct = () => {
    setShowForm(false);
    setCreatingProduct(false);
  };

  useClickOutside([formRef, addBtnRef], (e) => {
    if (!showForm) return;
    handleNotCreatingProduct();
  });

  useEffect(() => {
    setShowForm(creatingProduct);
    document.body.style.overflowY = creatingProduct ? "hidden" : "auto";
  }, [creatingProduct]);

  return (
    <div key={uuidv4()} className={cx("product-item")}>
      {user && user.is_admin ? (
        <div className={cx("new-product-btn")}>
          {showForm && (
            <div className={cx("extension-container")}>
              <div className={cx("wrapper")} ref={formRef}>
                <ProductCreationForm onNotCreatingProduct={handleNotCreatingProduct} />
              </div>
            </div>
          )}
          <div className={cx("add-btn-wrapper")}>
            <div className={cx("add-btn")} ref={addBtnRef} onClick={handleAddNewProductClick}>
              <AddCircle style={{ fontSize: 100, userSelect: "none" }} />
            </div>
          </div>
          <div className={cx("fake-product-item")}>
            <span className={cx("fake-img-wrapper")}></span>
            <p className={cx("fake-price-sale")}></p>
            <span className={cx("fake-name")}></span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddProductButton;
