import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { useSelector } from "react-redux";

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
          <div className={cx("item")} onClick={onLogoutClick}>
            Log out
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavbarUserActions;
