import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";

// components
import { ProductCard } from "~/components";

// fake data
import productCards from "./fakeData.json";

let cx = classNames.bind(styles);

const NewProducts = () => {
  const cards = productCards.data;

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <NavLink to="/all-products">
          <h4>New Products</h4>
        </NavLink>
        <div className={cx("product-list")}>
          <div className={cx("product-item")}>
            <ProductCard data={cards[0]} />
          </div>
          <div className={cx("product-item")}>
            <ProductCard data={cards[0]} />
          </div>
          <div className={cx("product-item")}>
            <ProductCard data={cards[0]} />
          </div>
          <div className={cx("product-item")}>
            <ProductCard data={cards[0]} />
          </div>
          <div className={cx("product-item")}>
            <ProductCard data={cards[0]} />
          </div>
          <div className={cx("product-item")}>
            <ProductCard data={cards[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
