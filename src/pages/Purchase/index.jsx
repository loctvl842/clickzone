import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { OrderTable } from "~/components";
// providers
import { PersistUser } from "~/providers";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUserId, selectAllOrders } from "~/store/orderSlice";
import { useEffect } from "react";

let cx = classNames.bind(styles);

const Purchase = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => selectAllOrders(state));
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchOrdersByUserId(accessToken));
    }
  }, [dispatch, accessToken]);

  return (
    <PersistUser>
      <div className={cx("container")}>
        <div className={cx("wrapper")}>
          <br />
          <h4>All orders</h4>
          {orders.map((order) => (
            <OrderTable key={order.id} order={order} />
          ))}
        </div>
      </div>
    </PersistUser>
  );
};

export default Purchase;
