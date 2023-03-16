import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// components
import { ProductCard } from "~/components";

// icons
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";

// fake data
import productCards from "./fakeData.json";
import { useState } from "react";

let cx = classNames.bind(styles);

const NUM_PAGE = 7;

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
              <li className={cx({ disappear: current < 2 })}>
                <NavLink to={"/"} onClick={() => { }}>
                  <span>
                    <KeyboardDoubleArrowLeft fontSize="small" />
                  </span>
                </NavLink>
              </li>
              <li className={cx({ disappear: current <= 0 })}>
                <NavLink
                  to={"/"}
                  onClick={() => setCurrent((current) => current - 1)}
                >
                  <span>
                    <KeyboardArrowLeft fontSize="small" />
                  </span>
                </NavLink>
              </li>
              {Array.from(
                { length: NUM_PAGE },
                (_, i) => current - (NUM_PAGE - 1) / 2 + i
              ).map((page) => (
                <li
                  key={uuidv4()}
                  className={cx({
                    disappear: page < 0,
                    active: page == current,
                  })}
                >
                  <NavLink
                    to={`all-products?page=${page}`}
                    onClick={() => {
                      handleNavClick(page);
                    }}
                  >
                    <span>{page + 1}</span>
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to={`/all-products?page=${current + 1}`}
                  onClick={() => setCurrent((current) => current + 1)}
                >
                  <span>
                    <KeyboardArrowRight fontSize="small" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"} onClick={() => { }}>
                  <span>
                    <KeyboardDoubleArrowRight fontSize="small" />
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </center>
    </div>
  );
};

export default NewProducts;
