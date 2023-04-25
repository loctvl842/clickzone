import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { Categories, Logo, NavbarUserActions } from "~/components";
// hooks
import { useClickOutside, useLogout, useNavbarFloat, useQuery } from "~/hook";

import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

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
  Login,
} from "@mui/icons-material";

import { useSelector } from "react-redux";
import { selectTotalCartItems } from "~/store/cartSlice";
import { getFormData } from "~/util";

let cx = classNames.bind(styles);

const ActionMenu = () => { };

const Navbar = () => {
  const navigate = useNavigate();
  const isFloat = useNavbarFloat();
  const [userActionVisible, setUserActionVisible] = useState(false);
  const totalItems = useSelector((state) => selectTotalCartItems(state));
  const accountBtnRef = useRef();
  const userActionsRef = useRef();
  const logout = useLogout();
  const query = useQuery();

  const user = useSelector((state) => state.user.data);

  useClickOutside([userActionsRef, accountBtnRef], () => {
    if (userActionVisible) setUserActionVisible(false);
  });

  const handleAccountBtnClick = () => {
    setUserActionVisible((prevState) => !prevState);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData(e.currentTarget);
    query.set("query", formData.search_string);
    query.delete("page");
    query.delete("sort");
    query.delete("category_id");
    navigate(`/search?${query.toString()}`);
  };

  return (
    <header className={cx("container", { "header-affix": isFloat })}>
      <div className={cx("wrapper")}>
        <div className={cx("row-1")}>
          <div className={cx("left")}>
            <div className={cx("menu__mobile")}>
              <div className={cx("action")}>
                <div className={cx("action-btn")}>
                  <Menu />
                </div>
              </div>
            </div>
            <div className={cx("user__mobile")}>
              <div className={cx("action")}>
                <div className={cx("action-btn")}>
                  <ArrowDropDown />
                  <ActionMenu />
                </div>
              </div>
            </div>
            <NavLink to="/home">
              <Logo />
            </NavLink>
          </div>
          <div className={cx("center")}>
            <form
              className={cx("header-search")}
              action=""
              method="GET"
              onSubmit={handleSearchSubmit}
            >
              <div className={cx("input-group")}>
                <input
                  type="text"
                  name="search_string"
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
              <NavLink to={"/cart"} className={cx("action-btn")}>
                <span>
                  <ShoppingCart />
                </span>
                {totalItems > 0 && (
                  <div className={cx("badge")}>{totalItems}</div>
                )}
              </NavLink>
            </div>
            <div className={cx("action")}>
              {!user ? (
                <NavLink
                  to="/login"
                  onClick={logout}
                  className={cx("action-btn")}
                >
                  <Login />
                </NavLink>
              ) : (
                <div
                  className={cx("action-btn")}
                  ref={accountBtnRef}
                  onClick={handleAccountBtnClick}
                >
                  <AccountCircle />
                  {userActionVisible && (
                    <div
                      className={cx("user-actions-wrapper")}
                      ref={userActionsRef}
                    >
                      <NavbarUserActions />
                    </div>
                  )}
                </div>
              )}
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
                <Categories />
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
                  <AccessTimeFilled style={{ width: 18 }} />
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
                  <Help style={{ width: 18 }} />
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
