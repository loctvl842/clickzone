import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { Logo, NavbarUserActions } from "~/components";

// action
import { userReset } from "~/store/userSlice";

// hooks
import { useClickOutside } from "~/hook";

import { v4 as uuidv4 } from "uuid";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// fake menu
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
  Login,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import axios from "axios";

let cx = classNames.bind(styles);

const ActionMenu = () => { };

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFloat, setIsFloat] = useState(false);
  const [userActionVisible, setUserActionVisible] = useState(false);
  const accountBtnRef = useRef();
  const userActionsRef = useRef();

  const { data: user } = useSelector((state) => state.user);

  const handleAccountBtnClick = () => {
    setUserActionVisible((prevState) => !prevState);
  };

  useClickOutside([userActionsRef, accountBtnRef], (e) => {
    if (userActionVisible) setUserActionVisible(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 106) {
        setIsFloat(true);
      } else {
        setIsFloat(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoutClick = async () => {
    Cookies.remove("token");
    try {
      dispatch(userReset());
      navigate("/login");
      await axios.post("/api/user/logout.php", {});
    } catch (e) {
      console.log({ logout: e });
    }
  };

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
              <NavLink to="/cart" className={cx("action-btn")}>
                <span>
                  <ShoppingCart />
                </span>
                <div className={cx("badge")}>5</div>
              </NavLink>
            </div>
            <div className={cx("action")}>
              {!user ? (
                <NavLink to="/login" onClick={handleLogoutClick} className={cx("action-btn")}>
                  <Login />
                </NavLink>
              ) : (
                <div className={cx("action-btn")} ref={accountBtnRef} onClick={handleAccountBtnClick}>
                  <AccountCircle />
                  {userActionVisible && (
                    <div className={cx("user-actions-wrapper")} ref={userActionsRef}>
                      <NavbarUserActions onLogoutClick={handleLogoutClick} />
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
