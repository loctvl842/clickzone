import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";

// icons
import { AccountCircle, Mail, Key, West, Phone } from "@mui/icons-material";

// components
import { FormControl, Logo } from "~/components";

import { useDispatch, useSelector } from "react-redux";
import { authReset } from "~/store/authSlice";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getFormData } from "~/util";
import { useSignup } from "~/hook";

let cx = classNames.bind(styles);

const formControls = [
  {
    name: "signup_username",
    icon: AccountCircle,
    type: "text",
    placeholder: "Your name",
  },
  {
    name: "signup_telephone",
    icon: Phone,
    type: "text",
    placeholder: "Your telephone",
  },
  {
    name: "signup_email",
    icon: Mail,
    type: "email",
    placeholder: "Your email",
  },
  {
    name: "signup_password",
    icon: Key,
    type: "password",
    placeholder: "Your password",
  },
];

const SignUp = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const signup = useSignup();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = getFormData(e.currentTarget);
    await signup({
      username: formData.signup_username,
      email: formData.signup_email,
      password: formData.signup_password,
      telephone: formData.signup_telephone,
    });
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
              {formControls.map((fc) => (
                <div key={uuidv4()} className={cx("form-control-wrapper")}>
                  <FormControl
                    name={fc.name}
                    icon={fc.icon}
                    type={fc.type}
                    placeholder={fc.placeholder}
                  />
                </div>
              ))}
              <button type="submit" className={cx("login-btn")}>
                {!authState.fetching && <span>Sign up</span>}
                <PulseLoader
                  color="#fff"
                  size={5}
                  loading={authState.fetching}
                />
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
