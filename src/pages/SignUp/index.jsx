import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";

// icons
import { AccountCircle, Mail, Key, West } from "@mui/icons-material";

let cx = classNames.bind(styles);

const SignUp = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("logo-wrapper")}></div>
        <div className={cx("form-wrapper")}>
          <div className={cx("header")}>
            <h2>Create An Account</h2>
          </div>
          <form className={cx("form-login")}>
            <label htmlFor="username" className={cx("form-control")}>
              <div className={cx("icon")}>
                <AccountCircle />
              </div>
              <input id="username" type="text" placeholder="Your name" />
            </label>
            <label htmlFor="email" className={cx("form-control")}>
              <div className={cx("icon")}>
                <Mail />
              </div>
              <input id="email" type="text" placeholder="Your email" />
            </label>
            <label htmlFor="password" className={cx("form-control")}>
              <div className={cx("icon")}>
                <Key />
              </div>
              <input
                id="password"
                type="password"
                placeholder="Your password"
              />
            </label>
            <button className={cx("login-btn")}>
              <span>Sign up</span>
            </button>
          </form>
          <div className={cx("separator-wrapper")}>
            <span className={cx("sep-line")}></span>
            <span className={cx("text")}>or</span>
            <span className={cx("sep-line")}></span>
          </div>
          <div className={cx("other-options")}>
            <ul>
              <li>
                <div className={cx("option-wrapper")}>
                  <div className={cx("logo", "logo-google")}></div>
                  <span className={cx("text")}>Google</span>
                </div>
              </li>
              <li>
                <div className={cx("option-wrapper")}>
                  <div className={cx("logo", "logo-fb")}></div>
                  <span className={cx("text")}>Facebook</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx("create-account-link")}>
          <NavLink to="/login">
            <span>
              <West fontSize="small" />
            </span>
            Back to Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
