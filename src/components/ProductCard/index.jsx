import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";

// utils
import { formatCurrency } from "~/util";

// modal
import { useState } from "react";

let cx = classNames.bind(styles);

const ProductCard = ({ product }) => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <div className={cx("container")}>
      {product !== undefined && (
        <img
          src={product.image_url}
          onLoad={() => setImgLoading(false)}
          style={{ display: "none" }}
          alt=""
        />
      )}
      {product !== undefined && !imgLoading ? (
        <NavLink
          to={{ pathname: `/${product.name.trim()}/${product.id}` }}
          className={cx("content")}
        >
          <div className={cx("card")}>
            <span className={cx("img-wrapper")}>
              <img src={product.image_url} className={cx("image")} alt="" />
            </span>
            <p className={cx("price-sale")}>
              {"Code "}
              <b>
                {product.id}
                <span className={cx("price")}>
                  {formatCurrency(product.price)}
                </span>
                {product.old_price && (
                  <span className={cx("old-price")}>
                    {formatCurrency(product.old_price)}
                  </span>
                )}
              </b>
            </p>
            <span className={cx("name")}>{product.name}</span>
          </div>
        </NavLink>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className={cx("content")}>
      <div className={cx("card")}>
        <span
          className={cx("img-wrapper", "skeleton-box")}
          style={{ display: "block" }}
        ></span>
        <p className={cx("price-sale")}>
          <span
            className={cx("skeleton-box")}
            style={{ width: 70, height: 17 }}
          ></span>
          <span
            className={cx("price", "skeleton-box")}
            style={{ width: 120, height: 17 }}
          ></span>
          <span
            className={cx("old-price", "skeleton-box")}
            style={{ width: 100, height: 12 }}
          ></span>
        </p>
        <span className={cx("name")}>
          <div
            className={cx("skeleton-box")}
            style={{ width: "100%", height: 36 }}
          ></div>
        </span>
      </div>
    </div>
  );
};

ProductCard.Loading = () => (
  <div className={cx("container")}>
    <Skeleton />
  </div>
);

export default ProductCard;
