import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink, useNavigate } from "react-router-dom";

// icons
import { AccountCircle, Mail, Key, West } from "@mui/icons-material";

// components
import { FormControl, Logo } from "~/components";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authFail, authReset, authStart, authSuccess } from "~/store/authSlice";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";

let cx = classNames.bind(styles);

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataArray = [...formData];
    const data = Object.fromEntries(dataArray);
    try {
      dispatch(authStart());
      await axios.post("/api/user/signup.php", {
        username: data.signup_username,
        email: data.signup_email,
        password: data.signup_password,
      });
      dispatch(authSuccess());
      navigate("/login");
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
                {!authState.fetching && <span>Sign up</span>}
                <PulseLoader color="#fff" size={5} loading={authState.fetching} />
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
