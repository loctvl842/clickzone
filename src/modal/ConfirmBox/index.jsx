import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { useDispatch } from "react-redux";

import { modalClose } from "~/store/modalSlice";
import { useEffect, useRef } from "react";

let cx = classNames.bind(styles);

export const modal_type = "confirmBox";
const ConfirmBox = ({ question, confirmBtnText, onConfirm }) => {
  const dispatch = useDispatch();
  const questionRef = useRef();

  const handleCancelBtnClick = () => {
    dispatch(modalClose());
  };

  useEffect(() => {
    questionRef.current.innerHTML = question;
  }, [question]);

  return (
    <div className={cx("container")}>
      <div className={cx("question")}>
        <h3 ref={questionRef}>{question}</h3>
      </div>
      <ul>
        <li>
          <button onClick={handleCancelBtnClick}>Cancel</button>
        </li>
        <li>
          <button onClick={onConfirm} className={cx("confirm-btn")}>
            {confirmBtnText}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ConfirmBox;
