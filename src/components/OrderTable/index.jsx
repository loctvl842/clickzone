import styles from "./style.module.scss";
import classNames from "classnames/bind";
// utils
import { formatCurrency } from "~/util";

import { NavLink } from "react-router-dom";

let cx = classNames.bind(styles);

const OrderTable = ({ order }) => {
  return (
    <div className={cx("container")}>
      <div className={cx("order-items")}>
        <table>
          <tbody>
            {order.order_items.map((item) => (
              <tr key={item.product_id}>
                <td
                  style={{
                    width: 50,
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <img src={item.image_url} alt="" />
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
              <td style={{ textAlign: "right" }}>Total cost: </td>
              <td>
                <b>
                  <span style={{ fontSize: 19, color: "#ee2347" }}>
                    {formatCurrency(order.total)}
                  </span>
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
