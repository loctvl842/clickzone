import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { CartTable } from "~/components";
import { formatCurrency } from "~/util";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

// actions
import { modalClose } from "~/store/modalSlice";

let cx = classNames.bind(styles);

const CartForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shoppingSession = useSelector((state) => state.session.data);
  const handlePayBtnClick = () => {
    dispatch(modalClose());
    navigate("/cart");
  };

  const handleCloseBtnClick = () => {
    dispatch(modalClose());
  };

  const handleBuyMoreClick = () => {
    dispatch(modalClose());
  };

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h1>Your Cart</h1>
        <button className={cx("close-btn")} onClick={handleCloseBtnClick}>
          <Close fontSize="small" />
        </button>
      </div>
      <div className={cx("cart-table-wrapper")}>
        <CartTable />
      </div>
      <div className={cx("total-wrapper")}>
        Total: <span>{formatCurrency(shoppingSession.total)}</span>
      </div>
      <div className={cx("btn-groups")}>
        <button
          className={cx("btn", "btn--success")}
          onClick={handlePayBtnClick}
        >
          Pay
        </button>
        <button className={cx("btn")} onClick={handleBuyMoreClick}>
          Buy More
        </button>
      </div>
    </div>
  );
};

CartForm.modal_type = "cartForm";

export default CartForm;
