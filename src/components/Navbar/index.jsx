import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CallIcon from "@mui/icons-material/Call";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

let cx = classNames.bind(styles);

const Navbar = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("row-1")}>
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
                  </button>
                </span>
              </div>
            </form>
          </div>
          <div className={cx("right")}>
            <div className={cx("user")}>
              <span>
                <ShoppingCartIcon />
              </span>
              <div className={cx("badge")}>5</div>
            </div>
            <div className={cx("user")}>
              <span>
                <LogoutIcon />
              </span>
            </div>
            <div className={cx("user")}>
              <AccountCircleIcon />
            </div>
          </div>
        </div>
        <div className={cx("row-2")}>
          <div className={cx("col-1")}>
            <NavLink className={cx("categories")}>
              <MenuIcon />
              <h2>All Categories</h2>
            </NavLink>
          </div>
          <div className={cx("col-2")}>
            <ul className={cx("support-policy")}>
              <li>
                <span>
                  <CallIcon style={{ width: 16 }} />
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
                  <AccessTimeIcon style={{ width: 16 }} />
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
                  <HelpOutlineIcon style={{ width: 16 }} />
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
    </div>
  );
};

export default Navbar;
