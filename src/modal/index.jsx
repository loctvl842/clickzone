import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useClickOutside } from "~/hook";
import { modalClose } from "~/store/modalSlice";

let cx = classNames.bind(styles);

export const modals = {};

const Modal = () => {
  const dispatch = useDispatch();
  const { visible, type } = useSelector((state) => state.modal);
  const boxRef = useRef();

  useClickOutside([boxRef], () => {
    dispatch(modalClose());
  });

  return (
    <>
      {visible && (
        <div className={cx("container")}>
          <div ref={boxRef} className={cx("box")}>
            {modals[type]}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
