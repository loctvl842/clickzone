import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";

let cx = classNames.bind(styles);

const ProductCard = ({ data }) => {
  const fakeData = {
    link: "./assets/product_card_akko_3061.jpg",
    // link: "./assets/akko3061.png",
    id: 2429,
    newPrice: 1500000,
    oldPrice: 1650000,
    name: "Bàn phím cơ AKKO 3061s RGB - Neon (Bluetooth 5.0)",
  };

  return (
    <div className={cx("container")}>
      <div className={cx("product-item")}>
        <NavLink to="/chuot-khong-day">
          <span className={cx("img-wrapper")}>
            <img src={fakeData.link} alt="" />
          </span>
          <p className={cx("price-sale")}>
            {"Code "}
            <b>
              {fakeData.id}
              <span className={cx("price")}>{fakeData.newPrice}</span>
              <span className={cx("old-price")}>{fakeData.oldPrice}</span>
            </b>
          </p>
          <span className={cx("name")}>{fakeData.name}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;
