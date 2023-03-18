import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { Logo } from "~/components";

import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios"

// icons
import { Mail, Key } from "@mui/icons-material";
import { useState } from "react";

let cx = classNames.bind(styles);

const Login = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState({ email: "", password: "" });

  const handleFormCtrlChange = (e) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/php/clickzone/api/users/login.php", auth)
      if (res.data.message == "success") {
        navigate('/')
      }
      console.log(res)
    } catch(err) {
      console.error(err)
    }
  };
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("logo-wrapper")}>
          <Logo size={45} />
        </div>
        <div className={cx("form-wrapper")}>
          <div className={cx("header")}>
            <h2>Log in</h2>
          </div>
          <form className={cx("form-login")}>
            <label for="email" className={cx("form-control")}>
              <div className={cx("icon")}>
                <Mail />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                value={auth.email}
                onChange={handleFormCtrlChange}
                placeholder="Your email"
              />
            </label>
            <label for="password" className={cx("form-control")}>
              <div className={cx("icon")}>
                <Key />
              </div>
              <input
                id="password"
                type="password"
                name="password"
                value={auth.password}
                onChange={handleFormCtrlChange}
                placeholder="Your password"
              />
            </label>
            <button className={cx("login-btn")} onClick={handleLogin}>
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
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
