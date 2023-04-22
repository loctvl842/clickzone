import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLogout } from "~/hook";

let cx = classNames.bind(styles);

const NavbarUserActions = () => {
  const user = useSelector((state) => state.user.data);
  const logout = useLogout();
  return (
    <div className={cx("action__menu")}>
      <ul>
        <li>
          <div className={cx("item")}>Account ({user.username})</div>
        </li>
        <li>
          <NavLink to="/purchase" className={cx("item")}>
            Purchase order
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={cx("item")} onClick={logout}>
            Log out
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavbarUserActions;
