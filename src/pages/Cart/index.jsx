import styles from "./style.module.scss";
import classNames from "classnames/bind";

// icons
import { Delete } from "@mui/icons-material";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, selectAllCartItems } from "~/store/cartSlice";
import { formatCurrency } from "~/util";
import axios from "axios";
import { sessionTotalSubtract } from "~/store/userSlice";

let cx = classNames.bind(styles);

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => selectAllCartItems(state));
  const total = useSelector((state) => state.user.session?.total);
  const handleRemoveCartItemClick = async (cartItem) => {
    dispatch(removeCartItem(cartItem.id));
    dispatch(sessionTotalSubtract(cartItem.price * cartItem.quantity));
    try {
      await axios.delete(
        `/api/cart_item/remove.php?cart_item_id=${cartItem.id}`
      );
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <br />
        <h4>Detail of products in cart</h4>
        <div className={cx("table-responsive")}>
          <table>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td
                    style={{
                      width: 50,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                    className={cx("delete-icon")}
                    onClick={() => handleRemoveCartItemClick(item)}
                  >
                    <Delete />
                  </td>
                  <td
                    style={{
                      width: 50,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <img src={item.image_url} alt="" style={{ width: 40 }} />
                  </td>
                  <td
                    style={{
                      width: 50,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <b>{item.quantity}</b>
                  </td>
                  <td style={{ padding: 8 }}>
                    <b>
                      <NavLink
                        to={{
                          pathname: `/${item.name.trim()}/${item.product_id}`,
                        }}
                      >
                        {item.name}
                      </NavLink>
                    </b>
                    <br />
                    <span className={cx("btn-info")}>Switch: Blue Switch</span>
                    <br />
                    <span>{formatCurrency(item.price)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={cx("payment-wrapper")}>
          <table style={{ float: "right", textAlign: "right" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "right" }}>Total:</td>
                <td>
                  <span style={{ fontSize: 19, color: "#ff7e00" }}>
                    {formatCurrency(total)}
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
                      {formatCurrency(740000)}
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
