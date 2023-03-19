import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { Logo, FormControl } from "~/components";

import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// icons
import { Mail, Key } from "@mui/icons-material";
import { useEffect, useState } from "react";

let cx = classNames.bind(styles);

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataArray = [...formData];
    const data = Object.fromEntries(dataArray);
    try {
      const res = await axios.post("/users/login.php", {
        email: data.login_email,
        password: data.login_password,
      });
      navigate("/");
      console.log(res);
    } catch (err) {
      // handle error
      // console.log(err.response);
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage("");
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("logo-wrapper")}>
          <Logo size={45} />
        </div>
        <div className={cx("form-wrapper")}>
          {message && (
            <div className={cx("message-wrapper")}>
              <p className={cx("message")}>{message}</p>
            </div>
          )}
          <div className={cx("header")}>
            <h2>Log in</h2>
          </div>
          <form className={cx("form-login")} onSubmit={handleLogin}>
            <div className={cx("form-control-wrapper")}>
              <FormControl label={<Mail />} name="login_email" placeholder="Your email" type="text" required={true} />
            </div>
            <div className={cx("form-control-wrapper")}>
              <FormControl label={<Key />} name="login_password" placeholder="Your password" type="password" />
            </div>
            <button type="submit" className={cx("login-btn")}>
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

// "proxy": {
//   "/": {
//     "target": "http://localhost",
//     "changeOrigin": true
//   }
// },
