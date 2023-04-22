import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { FormControl } from "~/components";
import { useDispatch } from "react-redux";
import { modalClose } from "~/store/modalSlice";
import { useEffect, useState } from "react";
import { generateVerifyCode, getFormData, isVerifyCodeValid } from "~/util";
import { Warning } from "@mui/icons-material";
import { useDispatchVerifyCode } from "~/hook";

let cx = classNames.bind(styles);

const VerifyForm = ({ email, username, callback }) => {
  const [verify_code, setVerify_code] = useState(generateVerifyCode());
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const dispatchVerifyCode = useDispatchVerifyCode();

  const handleCancelBtnClick = () => {
    dispatch(modalClose());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData(e.currentTarget);
    setError("");
    try {
      if (!isVerifyCodeValid(verify_code)) {
        throw new Error("The verified code is expired.");
      }
      if (formData.code !== verify_code.value) {
        throw new Error(
          "The number that you've entered doesn't match your code. Please try again."
        );
      }
      callback();
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (verify_code) {
      dispatchVerifyCode({
        to_email: email,
        username,
        verify_code: verify_code.value,
      });
    }
  }, [verify_code]);

  return (
    <form className={cx("container")} onSubmit={handleSubmit}>
      <div className={cx("header")}>
        <h3>Enter your security code</h3>
      </div>
      <div className={cx("content")}>
        {error && (
          <div className={cx("error")}>
            <span>
              <Warning />
            </span>
            <span style={{ marginLeft: 10 }}>{error}</span>
          </div>
        )}
        <p className={cx("description")}>
          Please check your emails for a message with your code. Your code is 6
          numbers long.
        </p>
        <div className={cx("input-wrapper")}>
          <FormControl
            name="code"
            placeholder="Enter code"
            className={cx("input-code")}
          />
          <div className={cx("message")}>
            <span className={cx("text")}>We sent your code to:</span>
            <span className={cx("email")}>{email}</span>
          </div>
        </div>
      </div>
      <div className={cx("btn-group")}>
        <button className={cx("btn")} onClick={handleCancelBtnClick}>
          Cancel
        </button>
        <button className={cx("btn", "btn--success")} type="submit">
          Continue
        </button>
      </div>
    </form>
  );
};

VerifyForm.modal_type = "verifyForm";

export default VerifyForm;
