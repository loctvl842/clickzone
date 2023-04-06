import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import { ProductCardAction } from "~/components";

let cx = classNames.bind(styles);

const ProductCard = ({ product }) => {
  const { data: user } = useSelector((state) => state.user);

  return (
    <div className={cx("container")}>
      {product && (
        <NavLink to={{ pathname: `/${product.name.trim()}/${product.id}` }} className={cx("product-item")}>
          {user && user.is_admin && <ProductCardAction />}
          <div>
            <span className={cx("img-wrapper")}>
              <img src={product.image_url} alt="" />
            </span>
            <p className={cx("price-sale")}>
              {"Code "}
              <b>
                {product.id}
                <span className={cx("price")}>{product.price}</span>
                <span className={cx("old-price")}>{product.old_price}</span>
              </b>
            </p>
            <span className={cx("name")}>{product.name}</span>
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default ProductCard;
