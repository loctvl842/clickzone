import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { Logo, FormControl } from "~/components";

import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// icons
import { Mail, Key } from "@mui/icons-material";
import { useEffect } from "react";

// actions
import { authStart, authSuccess, authFail, authReset } from "~/store/authSlice";

import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { userSet } from "~/store/userSlice";

let cx = classNames.bind(styles);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataArray = [...formData];
    const input_data = Object.fromEntries(dataArray);
    try {
      dispatch(authStart());
      const res = await axios.post("/api/user/login.php", {
        email: input_data.login_email,
        password: input_data.login_password,
      });
      const data = res.data;
      dispatch(authSuccess(data.message));
      dispatch(userSet(data.user));
      Cookies.set("token", data.token, { expires: 1 }); // expired in 1 day
      navigate("/home");
    } catch (err) {
      dispatch(authFail(err.response.data.message));
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(authReset());
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [authState.error, dispatch]);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      navigate(-1);
    }
  }, [navigate]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("logo-wrapper")}>
          <Logo size={45} />
        </div>
        <div className={cx("form-wrapper")}>
          <div className={cx("message-wrapper", { visible: authState.error })}>
            <p className={cx("message")}>{authState.message}</p>
          </div>
          <div className={cx("card")}>
            <div className={cx("header")}>
              <h2>Log in</h2>
            </div>
            <form className={cx("form-login")} onSubmit={handleLogin}>
              <div className={cx("form-control-wrapper")}>
                <FormControl
                  icon={Mail}
                  name="login_email"
                  placeholder="Your email"
                  type="email"
                  required={true}
                />
              </div>
              <div className={cx("form-control-wrapper")}>
                <FormControl
                  icon={Key}
                  name="login_password"
                  placeholder="Your password"
                  type="password"
                />
              </div>
              <button type="submit" className={cx("submit-btn")}>
                {!authState.fetching && <span>Log In</span>}
                <PulseLoader
                  color="#fff"
                  size={5}
                  loading={authState.fetching}
                />
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
        </div>
        <div className={cx("create-account-link")}>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
