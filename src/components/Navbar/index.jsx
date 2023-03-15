import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";
import { useState } from "react";

import {
  Menu,
  Logout,
  ShoppingCart,
  AccountCircle,
  Call,
  AccessTime,
  HelpOutline,
  ArrowDropDown,
  Search,
} from "@mui/icons-material";

let cx = classNames.bind(styles);

const Navbar = () => {
  const [isFloat, setIsFloat] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 106) {
      setIsFloat(true);
    } else {
      setIsFloat(false);
    }
  });
  return (
    <header className={cx("container", { "header-affix": isFloat })}>
      <div className={cx("wrapper")}>
        <div className={cx("row-1")}>
          <div className={cx("menu__mobile")}>
            <Menu />
          </div>
          <div className={cx("user__mobile")}>
            <ArrowDropDown />
          </div>
          <div className={cx("left")}>
            <NavLink to="/home">
              <h1 className={cx("logo")}>
                <span>C</span>
                <span>lickZone</span>
              </h1>
            </NavLink>
          </div>
          <div className={cx("center")}>
            <form className={cx("header-search")} action="" method="GET">
              <div className={cx("input-group")}>
                <input
                  type="text"
                  autoComplete="off"
                  className={cx("form-control")}
                  placeholder="Search your product..."
                />
                <span className={cx("input-group-btn")}>
                  <button className={cx("btn")} type="submit">
                    <span>Search</span>
                    <Search className={cx("search-icon")}/>
                  </button>
                </span>
              </div>
            </form>
          </div>
          <div className={cx("right")}>
            <div className={cx("user")}>
              <span>
                <ShoppingCart />
              </span>
              <div className={cx("badge")}>5</div>
            </div>
            <div className={cx("user")}>
              <span>
                <Logout />
              </span>
            </div>
            <div className={cx("user")}>
              <AccountCircle />
            </div>
          </div>
        </div>
        <div className={cx("row-2")}>
          <div className={cx("col-1")}>
            <NavLink className={cx("categories")}>
              <Menu />
              <h2>All Categories</h2>
            </NavLink>
          </div>
          <div className={cx("col-2")}>
            <ul className={cx("support-policy")}>
              <li>
                <span>
                  <Call style={{ width: 16 }} />
                </span>
                <span>HOTLINE:</span>
                <span>
                  <a href="tel:0967123456">
                    <b>
                      <span style={{ fontSize: 13, color: "red" }}>
                        0967.123.456
                      </span>
                    </b>
                  </a>
                  <span> - </span>
                  <a href="tel:0967123456">
                    <b>
                      <span style={{ fontSize: 13, color: "red" }}>
                        0967.123.456
                      </span>
                    </b>
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <AccessTime style={{ width: 16 }} />
                </span>
                <span>OPEN:</span>
                <span>
                  <a href="/">
                    <b>
                      <span style={{ fontSize: 13, color: "red" }}>
                        09h - 19h
                      </span>
                    </b>
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <HelpOutline style={{ width: 16 }} />
                </span>
                <span>TECHNICAL SUPPORT:</span>
                <span>
                  <a href="tel:0967123456">
                    <b>
                      <span style={{ fontSize: 13, color: "red" }}>
                        0967.123.456
                      </span>
                    </b>
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
