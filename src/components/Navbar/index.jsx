import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { Logo } from "~/components";

import { NavLink } from "react-router-dom";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

// icons
import {
  Menu,
  Logout,
  ShoppingCart,
  AccountCircle,
  Call,
  AccessTimeFilled,
  Help,
  ArrowDropDown,
  Search,
  NavigateNext,
} from "@mui/icons-material";

let cx = classNames.bind(styles);

const menu_0 = [
  {
    title: "Mechanical Keyboard",
    link: "/",
    menu_1: [
      {
        title: "AKKO keyboard",
        link: "/",
      },
      {
        title: "Dareu keyboard",
        link: "/",
      },
      {
        title: "Anne Pro 2 keyboard",
        link: "/",
      },
      {
        title: "iKBC keyboard",
        link: "/",
      },
      {
        title: "Keydous keyboard",
        link: "/",
      },
      {
        title: "Ajazz keyboard",
        link: "/",
      },
      {
        title: "Keywalker keyboard",
        link: "/",
      },
      {
        title: "Royal Kludge keyboard",
        link: "/",
      },
      {
        title: "Fuhlen keyboard",
        link: "/",
      },
    ],
  },
  {
    title: "Gaming Mouse",
    link: "/",
    menu_1: [
      {
        title: "AKKO mouse",
        link: "/",
      },
      {
        title: "Fuhlen mouse",
        link: "/",
      },
      {
        title: "Dareu mouse",
        link: "/",
      },
      {
        title: "Ajazz mouse",
        link: "/",
      },
      {
        title: "Wireless mouse",
        link: "/",
      },
      {
        title: "Logitech mouse",
        link: "/",
      },
      {
        title: "Edra mouse",
        link: "/",
      },
    ],
  },
  {
    title: "Switch",
    link: "/",
  },
  {
    title: "Mouse Pad",
    link: "/",
    menu_1: [
      {
        title: "Doraemon Mouse pad",
        link: "/",
      },
      {
        title: "One Piece Mouse pad",
        link: "/",
      },
      {
        title: "Dota 2 Mouse pad",
        link: "/",
      },
      {
        title: "LOL Mouse pad",
        link: "/",
      },
      {
        title: "Dragon Ball Mouse pad",
        link: "/",
      },
      {
        title: "Naruto Mouse pad",
        link: "/",
      },
      {
        title: "Led RGB Mouse pad",
        link: "/",
      },
    ],
  },
  {
    title: "Keycap",
    link: "/",
  },
  {
    title: "Gadgets",
    link: "/",
    menu_1: [
      {
        title: "Earphone",
        link: "/",
      },
      {
        title: "Figure",
        link: "/",
      },
      {
        title: "Laptop screen",
        link: "/",
      },
      {
        title: "Gaming chair",
        link: "/",
      },
    ],
  },
  {
    title: "Repair, Mod tools",
    link: "/",
  },
];

const ActionMenu = () => {
  return (
    <div className={cx("action__menu")}>
      <ul>
        <li>
          <div className={cx("item")}>Account</div>
        </li>
        <li>
          <div className={cx("item")}>Log out</div>
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
                                <NavLink
                                  to={item_1.link}
                                  className={cx("item-1")}
                                >
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
