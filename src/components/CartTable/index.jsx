import styles from "./style.module.scss";
import classNames from "classnames/bind";

// store
import { removeCartItem, selectAllCartItems } from "~/store/cartSlice";
import { sessionTotalSubtract } from "~/store/sessionSlice";

// icons
import { Delete } from "@mui/icons-material";

// utils
import { formatCurrency } from "~/util";

import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

let cx = classNames.bind(styles);

const CartTable = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => selectAllCartItems(state));

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
  );
};

export default CartTable;
