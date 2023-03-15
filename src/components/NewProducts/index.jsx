import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";

let cx = classNames.bind(styles);

const NewProducts = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <NavLink to="/all-products">New Products</NavLink>
      </div>
    </div>
  );
};

export default NewProducts;
