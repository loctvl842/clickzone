import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Delete, Edit } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { useClickOutside } from "~/hook";
import { useDispatch } from "react-redux";
import { confirmModalSetType } from "~/store/confirmModalSlice";
import { confirmModals } from "~/components/ConfirmModal";

let cx = classNames.bind(styles);

const MODAL_TYPE = "product";

const ProductCardAction = () => {
  const dispatch = useDispatch();
  const promptRef = useRef();
  const removeBtnRef = useRef();

  useClickOutside([promptRef, removeBtnRef], () => {});

  const handleEditProduct = (e) => {
    e.preventDefault();
  };
  const handleRemoveBtnClick = (e) => {
    e.preventDefault();
    dispatch(confirmModalSetType(MODAL_TYPE));
  };

  useEffect(() => {
    confirmModals[MODAL_TYPE] = () => {
      console.log("handle removing");
    };
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <ul>
          <li>
            <button ref={removeBtnRef} className={cx("icon")} onClick={handleRemoveBtnClick}>
              <Delete />
            </button>
          </li>
          <li>
            <button className={cx("icon")} onClick={handleEditProduct}>
              <Edit />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCardAction;
