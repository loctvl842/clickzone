import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";

let cx = classNames.bind(styles);

const ProductCard = ({ data }) => {
  return (
    <div className={cx("container")}>
      <div className={cx("product-item")}>
        <NavLink to="/chuot-khong-day">
          <span className={cx("img-wrapper")}>
            <img src={data.link} alt="" />
          </span>
          <p className={cx("price-sale")}>
            {"Code "}
            <b>
              {data.id}
              <span className={cx("price")}>{data.newPrice}</span>
              <span className={cx("old-price")}>{data.oldPrice}</span>
            </b>
          </p>
          <span className={cx("name")}>{data.name}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;
