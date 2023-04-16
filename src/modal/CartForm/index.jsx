import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { CartTable } from "~/components";
import { formatCurrency } from "~/util";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Close } from "@mui/icons-material";

// actions
import { modalClose } from "~/store/modalSlice";

let cx = classNames.bind(styles);

const CartForm = () => {
  const dispatch = useDispatch();
  const total = useSelector((state) => state.user.session.total);
  const handlePayBtnClick = () => {
    dispatch(modalClose());
  };

  const handleBuyMoreClick = () => {
    dispatch(modalClose());
  };

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h1>Your Cart</h1>
        <button className={cx("close-btn")}>
          <Close fontSize="small" />
        </button>
      </div>
      <div className={cx("cart-table-wrapper")}>
        <CartTable />
      </div>
      <div className={cx("total-wrapper")}>
        Total: <span>{formatCurrency(total)}</span>
      </div>
      <div className={cx("btn-groups")}>
        <button className={cx("btn", "btn--success")}>
          <NavLink to={"/cart"} onClick={handlePayBtnClick}>
            Pay
          </NavLink>
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
