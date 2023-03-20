import styles from "./style.module.scss";
import classNames from "classnames/bind";

// icons
import { Delete } from "@mui/icons-material";

import { NavLink } from "react-router-dom";

let cx = classNames.bind(styles);

const Cart = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <br />
        <h4>Detail of products in cart</h4>
        <div className={cx("table-responsive")}>
          <table>
            <tbody>
              <tr>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }} className={cx("delete-icon")}>
                  <Delete />
                </td>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }}>
                  <img src="http://localhost:3000/assets/dareu-ek87-v2.jpg" alt="" style={{ width: 40 }} />
                </td>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }}>
                  <b>1</b>
                </td>
                <td style={{ padding: 8 }}>
                  <b>
                    <NavLink to={"/"}>Bàn phím cơ Dareu EK87 V2 (Multi-Led)</NavLink>
                  </b>
                  <br />
                  <span className={cx("btn-info")}>Switch: Blue Switch</span>
                  <br />
                  <span>495000</span>
                </td>
              </tr>
              <tr>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }} className={cx("delete-icon")}>
                  <Delete />
                </td>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }}>
                  <img src="http://localhost:3000/assets/dareu-ek87-v2.jpg" alt="" style={{ width: 40 }} />
                </td>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }}>
                  <b>1</b>
                </td>
                <td style={{ padding: 8 }}>
                  <b>
                    <NavLink to={"/"}>Bàn phím cơ Dareu EK87 V2 (Multi-Led)</NavLink>
                  </b>
                  <br />
                  <span className={cx("btn-info")}>Switch: Blue Switch</span>
                  <br />
                  <span>495000</span>
                </td>
              </tr>
              <tr>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }} className={cx("delete-icon")}>
                  <Delete />
                </td>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }}>
                  <img src="http://localhost:3000/assets/dareu-ek87-v2.jpg" alt="" style={{ width: 40 }} />
                </td>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }}>
                  <b>1</b>
                </td>
                <td style={{ padding: 8 }}>
                  <b>
                    <NavLink to={"/"}>Bàn phím cơ Dareu EK87 V2 (Multi-Led)</NavLink>
                  </b>
                  <br />
                  <span className={cx("btn-info")}>Switch: Blue Switch</span>
                  <br />
                  <span>495000</span>
                </td>
              </tr>
              <tr>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }} className={cx("delete-icon")}>
                  <Delete />
                </td>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }}>
                  <img src="http://localhost:3000/assets/dareu-ek87-v2.jpg" alt="" style={{ width: 40 }} />
                </td>
                <td style={{ width: 50, textAlign: "center", verticalAlign: "middle" }}>
                  <b>1</b>
                </td>
                <td style={{ padding: 8 }}>
                  <b>
                    <NavLink to={"/"}>Bàn phím cơ Dareu EK87 V2 (Multi-Led)</NavLink>
                  </b>
                  <br />
                  <span className={cx("btn-info")}>Switch: Blue Switch</span>
                  <br />
                  <span>495000</span>
                </td>
              </tr>
            </tbody>
            {/* <tr> */}
            {/*   <td className={cx("trash-bin")}> */}
            {/*     <Delete /> */}
            {/*   </td> */}
            {/* </tr> */}
          </table>
        </div>
        <div className={cx("payment-wrapper")}>
          <table style={{ float: "right", textAlign: "right" }}>
            <tr>
              <td style={{ textAlign: "right" }}>Total:</td>
              <td>
                <span style={{ fontSize: 19, color: "#ff7e00" }}>740000</span>
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
                  <span style={{ fontSize: 19, color: "#ee2347" }}>740000</span>
                </b>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}></td>
              <td>
                <span style={{ color: "#333", fontSize: 11 }}>(Not included shipping fee)</span>
              </td>
            </tr>
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
