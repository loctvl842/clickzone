import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { Logo } from "~/components";

import { NavLink } from "react-router-dom";

// icons
import { Mail, Key } from "@mui/icons-material";

let cx = classNames.bind(styles);

const Login = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("logo-wrapper")}>
          <Logo />
        </div>
        <div className={cx("form-wrapper")}>
          <div className={cx("header")}>
            <h2>Log in</h2>
          </div>
          <form className={cx("form-login")}>
            <div className={cx("form-control")}>
              <div className={cx("icon")}>
                <Mail />
              </div>
              <input type="text" placeholder="Your email" />
            </div>
            <div className={cx("form-control")}>
              <div className={cx("icon")}>
                <Key />
              </div>
              <input type="password" placeholder="Your password" />
            </div>
            <button className={cx("login-btn")}>
              <span>Log In</span>
            </button>
            <div className={cx("password-recovery-link")}>
              <NavLink>Forgot password?</NavLink>
            </div>
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
                  <div className={cx("logo")}>
                    <img src="/assets/google-logo.png" alt="" />
                  </div>
                  <span className={cx("text")}>Google</span>
                </div>
              </li>
              <li>
                <div className={cx("option-wrapper")}>
                  <div className={cx("logo")}>
                    <img src="/assets/fb-logo.png" alt="" />
                  </div>
                  <span className={cx("text")}>Facebook</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx("create-account-link")}>
          Don't have an account?<a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
