import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

let cx = classNames.bind(styles);

const NavbarUserActions = ({ onLogoutClick }) => {
  const { data: user } = useSelector((state) => state.user);
  return (
    <div className={cx("action__menu")}>
      <ul>
        <li>
          <div className={cx("item")}>Account ({user.username})</div>
        </li>
        <li>
          <NavLink to="/login" className={cx("item")} onClick={onLogoutClick}>
            Log out
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavbarUserActions;
