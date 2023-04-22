import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { CartTable } from "~/components";
import { PersistUser } from "~/providers";

import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "~/util";
import { useNavigate } from "react-router-dom";
import { useCreateOrderDetails } from "~/hook";
import { addNewOrder } from "~/store/orderSlice";
import { cleanCart } from "~/store/cartSlice";

let cx = classNames.bind(styles);

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingSession = useSelector((state) => state.session.data);
  const user = useSelector((state) => state.user.data);
  const createOrderDetails = useCreateOrderDetails();
  const handleOrderClick = async () => {
    try {
      const orderDetails = await createOrderDetails({
        user_id: user.id,
        total: shoppingSession.total,
      });
      dispatch(
        addNewOrder({
          order_id: orderDetails.id,
          session_id: shoppingSession.id,
          total: orderDetails.total,
        })
      );
      dispatch(cleanCart(shoppingSession.id));
      navigate("/purchase");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PersistUser>
      {shoppingSession && (
        <div className={cx("container")}>
          <div className={cx("wrapper")}>
            <br />
            <h4>Detail of products in cart</h4>
            <CartTable />
            <div className={cx("payment-wrapper")}>
              <table style={{ float: "right", textAlign: "right" }}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "right" }}>Total:</td>
                    <td>
                      <span style={{ fontSize: 19, color: "#ff7e00" }}>
                        {formatCurrency(shoppingSession.total)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>Discount:</td>
                    <td>
                      <span style={{ fontSize: 19, color: "#ff7e00" }}>0</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>Order total:</td>
                    <td>
                      <b>
                        <span style={{ fontSize: 19, color: "#ee2347" }}>
                          {formatCurrency(shoppingSession.total)}
                        </span>
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}></td>
                    <td>
                      <span style={{ color: "#333", fontSize: 11 }}>
                        (Not included shipping fee)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <center>
              <button className={cx("order-btn")} onClick={handleOrderClick}>
                Order
              </button>
            </center>
          </div>
        </div>
      )}
    </PersistUser>
  );
};

export default Cart;
