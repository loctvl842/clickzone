import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import axios from "axios";

// action
import { userReset } from "~/store/userSlice";

let cx = classNames.bind(styles);

const NavbarUserActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    Cookies.remove("token");
    try {
      dispatch(userReset())
      navigate("/login");
      await axios.post("/api/user/logout.php", {});
    } catch (e) {
      console.log({ logout: e });
    }
  };
  return (
    <div className={cx("action__menu")}>
      <ul>
        <li>
          <div className={cx("item")}>Account ({user.username})</div>
        </li>
        <li>
          <div className={cx("item")} onClick={handleLogout}>
            Log out
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavbarUserActions;
