import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

import { confirmModalClose } from "~/store/confirmModalSlice";

let cx = classNames.bind(styles);

export const confirmModals = {};
const ConfirmModal = () => {
  const dispatch = useDispatch();
  const { visible, type } = useSelector((state) => state.confirmModal);

  const promptRef = useRef();
  const confirmBtnRef = useRef();

  const handleCancelRemoveClick = (e) => {
    e.preventDefault();
    dispatch(confirmModalClose());
  };

  const handleConfirm = () => {
    confirmModals[type]();
  };

  return (
    <>
      {visible ? (
        <div className={cx("confirm-container")}>
          <div ref={promptRef} className={cx("prompt")}>
            <div className={cx("question")}>
              <h3>Are you you want to remove product product-name?</h3>
            </div>
            <ul>
              <li>
                <button onClick={handleCancelRemoveClick}>Cancel</button>
              </li>
              <li>
                <button ref={confirmBtnRef} onClick={handleConfirm} className={cx("confirm-btn")}>
                  Remove
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConfirmModal;
