import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { Logo } from "~/components";

// actions
import { authReset } from "~/store/authSlice";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { menu_0 } from "./menu";

// icons
import {
  Menu,
  ShoppingCart,
  AccountCircle,
  Call,
  AccessTimeFilled,
  Help,
  ArrowDropDown,
  Search,
  NavigateNext,
} from "@mui/icons-material";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";

let cx = classNames.bind(styles);

const ActionMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    Cookies.remove("token");
    try {
      await axios.post("/api/user/logout.php", {});
      dispatch(authReset());
      navigate("/login");
    } catch (e) {
      console.log({ logout: e });
    }
  };
  return (
    <div className={cx("action__menu")}>
      <ul>
        <li>
          <div className={cx("item")}>Account</div>
        </li>
        <li>
          <div className={cx("item")} onClick={handleLogoutClick}>
            Log out
          </div>
        </li>
      </ul>
    </div>
  );
};

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
            <div className={cx("action")}>
              <ArrowDropDown />
              <ActionMenu />
            </div>
          </div>
          <div className={cx("left")}>
            <NavLink to="/home">
              <Logo />
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
                    <Search className={cx("search-icon")} />
                  </button>
                </span>
              </div>
            </form>
          </div>
          <div className={cx("right")}>
            <div className={cx("action")}>
              <span>
                <ShoppingCart />
              </span>
              <div className={cx("badge")}>5</div>
            </div>
            <div className={cx("action")}>
              <AccountCircle />
              <ActionMenu />
            </div>
          </div>
        </div>
        <div className={cx("row-2")}>
          <div className={cx("categories-wrapper")}>
            <div className={cx("categories")}>
              <div className={cx("categories__title")}>
                <Menu />
                <h2>All Categories</h2>
              </div>
              <div className={cx("categories__menu-0")}>
                <ul>
                  {menu_0.map((item_0) => (
                    <li key={uuidv4()}>
                      <NavLink to={item_0.link} className={cx("item-0")}>
                        <span className={cx("active-bar")}></span>
                        <span>{item_0.title}</span>
                        {item_0.menu_1 && (
                          <div className={cx("nav-icon")}>
                            <NavigateNext fontSize="small" />
                          </div>
                        )}
                      </NavLink>
                      {item_0.menu_1 && (
                        <div className={cx("menu-1")}>
                          <ul>
                            {item_0.menu_1.map((item_1) => (
                              <li key={uuidv4()}>
                                <NavLink to={item_1.link} className={cx("item-1")}>
                                  <span>{item_1.title}</span>
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={cx("support-policy-wrapper")}>
            <ul className={cx("support-policy")}>
              <li>
                <span>
                  <Call style={{ width: 18 }} />
                </span>
                <span>HOTLINE:</span>
                <span>
                  <a href="tel:0967123456">
                    <b>
                      <span style={{ fontSize: 13, color: "red" }}>0967.123.456</span>
                    </b>
                  </a>
                  <span> - </span>
                  <a href="tel:0967123456">
                    <b>
                      <span style={{ fontSize: 13, color: "red" }}>0967.123.456</span>
                    </b>
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <AccessTimeFilled style={{ width: 18 }} />
                </span>
                <span>OPEN:</span>
                <span>
                  <a href="/">
                    <b>
                      <span style={{ fontSize: 13, color: "red" }}>09h - 19h</span>
                    </b>
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <Help style={{ width: 18 }} />
                </span>
                <span>TECHNICAL SUPPORT:</span>
                <span>
                  <a href="tel:0967123456">
                    <b>
                      <span style={{ fontSize: 13, color: "red" }}>0967.123.456</span>
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
