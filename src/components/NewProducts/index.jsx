import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// components
import { ProductCard } from "~/components";

// fake data
import productCards from "./fakeData.json";
import { useState } from "react";

let cx = classNames.bind(styles);

const NewProducts = () => {
  const cards = productCards.data;
  const [current, setCurrent] = useState(0);

  const handleNavClick = (pageNumber) => {
    setCurrent(pageNumber);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <NavLink to="/all-products">
          <h4>New Products</h4>
        </NavLink>
      </div>
      <div className={cx("product-list")}>
        {cards.map((card) => (
          <div key={uuidv4()} className={cx("product-item")}>
            <ProductCard data={card} />
          </div>
        ))}
      </div>
      <center>
        <div style={{ display: "table" }}>
          <div className={cx("pagination-wrapper")}>
            <ul className={cx("pagination")}>
              {Array.from({ length: 7 }, (_, i) => current - 3 + i).map(
                (page) => (
                  <li
                    key={uuidv4()}
                    className={cx({
                      negative: page < 0,
                      active: page == current,
                    })}
                  >
                    <NavLink
                      to={`all-products?page=${page}`}
                      onClick={() => {
                        handleNavClick(page);
                      }}
                    >
                      {page + 1}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </center>
    </div>
  );
};

export default NewProducts;
