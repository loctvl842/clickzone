import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { CartTable } from "~/components";

import { useSelector } from "react-redux";
import { formatCurrency } from "~/util";

let cx = classNames.bind(styles);

const Cart = () => {
  const shoppingSession = useSelector((state) => state.session.data);

  return (
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
          <button className={cx("order-btn")}>Order</button>
        </center>
      </div>
    </div>
  );
};

export default Cart;
