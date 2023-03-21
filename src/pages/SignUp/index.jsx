import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink, useNavigate } from "react-router-dom";

// icons
import { AccountCircle, Mail, Key, West } from "@mui/icons-material";

// components
import { FormControl, Logo } from "~/components";
import { useEffect, useState } from "react";
import axios from "axios";

let cx = classNames.bind(styles);

const SignUp = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataArray = [...formData];
    const data = Object.fromEntries(dataArray);
    try {
      const res = await axios.post("/api/user/signup.php", {
        username: data.signup_username,
        email: data.signup_email,
        password: data.signup_password,
      });
      if (res.data.registered) {
        navigate("/login");
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
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
            <h2>Create An Account</h2>
          </div>
          <form onSubmit={handleSignUp} className={cx("form-login")}>
            <div className={cx("form-control-wrapper")}>
              <FormControl name="signup_username" label={<AccountCircle />} type="text" placeholder="Your name" />
            </div>
            <div className={cx("form-control-wrapper")}>
              <FormControl name="signup_email" label={<Mail />} type="email" placeholder="Your email" />
            </div>
            <div className={cx("form-control-wrapper")}>
              <FormControl name="signup_password" label={<Key />} type="password" placeholder="Your password" />
            </div>
            <button type="submit" className={cx("login-btn")}>
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
