import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { modalOpen } from "~/store/modalSlice";

// modal
import { modals } from "~/modal";
import ConfirmBox, { modal_type } from "~/modal/ConfirmBox";

let cx = classNames.bind(styles);

const ProductCardAction = () => {
  const dispatch = useDispatch();

  const handleEditProduct = (e) => {
    e.preventDefault();
  };

  const handleRemoveBtnClick = (e) => {
    e.preventDefault();
    modals[modal_type] = (
      <ConfirmBox
        question="Are you you want to remove product product-name?"
        confirmBtnText="Remove"
        onConfirm={handleConfirm}
      />
    );
    dispatch(modalOpen(modal_type));
  };

  const handleConfirm = () => {
    console.log("Remove this shit for me...");
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <ul>
          <li>
            <button className={cx("icon")} onClick={handleRemoveBtnClick}>
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
