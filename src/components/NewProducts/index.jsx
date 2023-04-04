import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { ProductCard, Paginator, ProductCreationForm } from "~/components";

// icons
import { AddCircle } from "@mui/icons-material";

// fake data
import productCards from "./fakeData.json";

// hook
import { useClickOutside } from "~/hook";
import { useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

let cx = classNames.bind(styles);

const NewProducts = () => {
  const cards = productCards.data;

  const [showForm, setShowForm] = useState(false);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const formRef = useRef();
  const addBtnRef = useRef();
  const user = useSelector((state) => state.user);

  useClickOutside(formRef, (e) => {
    if (!showForm) return;
    const el = addBtnRef.current;
    if (el && el.contains(e.target)) {
      return;
    }
    console.log('loc')
    setShowForm(false);
    setCreatingProduct(false);
  });

  const handleAddNewProductClick = () => {
    setCreatingProduct(true);
  };

  useEffect(() => {
    setShowForm(creatingProduct);
    document.body.style.overflowY = creatingProduct ? "hidden" : "auto";
  }, [creatingProduct]);

  return (
    <div className={cx("container")}>
      <div className={cx("product-list")}>
        <div key={uuidv4()} className={cx("product-item")}>
          {user !== null && user.is_admin ? (
            <div className={cx("new-product-btn")}>
              {showForm && (
                <div className={cx("extension-container")}>
                  <div className={cx("wrapper")}>
                    <div ref={formRef}>
                      <ProductCreationForm />
                    </div>
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
        {cards.map((card) => (
          <div key={uuidv4()} className={cx("product-item")}>
            <ProductCard data={card} />
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
