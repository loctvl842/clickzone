import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { NewProducts } from "~/components";

// hooks
import { useClickOutside } from "~/hook";

import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

let cx = classNames.bind(styles);

const OptionBox = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [value, setValue] = useState("New Products");
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const handleSortClick = (e) => {
    setValue(e.target.textContent);
    setIsMenuVisible(false);
  };

  const handleOptionBtnClick = () => {
    setIsMenuVisible((prev) => !prev);
  };

  useClickOutside([menuRef, btnRef], () => {
    setIsMenuVisible(false);
  });

  return (
    <div className={cx("option-box")}>
      <button className={cx("btn")} ref={btnRef} onClick={handleOptionBtnClick}>
        {value} <span className={cx("caret")}></span>
      </button>
      {isMenuVisible && (
        <div ref={menuRef} className={cx("menu")}>
          <ul>
            <li>
              <NavLink
                to={{ pathname: "/all-products", search: "?sort=0" }}
                className={cx("item")}
                onClick={handleSortClick}
              >
                New Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: "/all-products", search: "?sort=1" }}
                className={cx("item")}
                onClick={handleSortClick}
              >
                From Low To High Price
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: "/all-products", search: "?sort=2" }}
                className={cx("item")}
                onClick={handleSortClick}
              >
                From High To Low Price
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const AllProducts = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("title-wrapper")}>
        <div className={cx("title")}>
          <NavLink to="/all-products">
            <h4>All Products</h4>
          </NavLink>
        </div>
      </div>
      <OptionBox />
      <NewProducts />
    </div>
  );
};

export default AllProducts;
