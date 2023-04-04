import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { HomeSlideShow, HotProduct, NewProducts } from "~/components";

// hook
import { useCurrentUser } from "~/hook";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSet } from "~/store/userSlice";
import { useEffect } from "react";

let cx = classNames.bind(styles);

const Home = () => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  useEffect(() => {
    dispatch(userSet(user));
  }, [dispatch, user]);

  return (
    <div className={cx("container")}>
      <div>
        <HomeSlideShow />
      </div>
      <div>
        <div className={cx("title-wrapper")}>
          <div className={cx("title")}>
            <h4>Hot Product</h4>
          </div>
        </div>
        <HotProduct />
      </div>
      <div>
        <div className={cx("title-wrapper")}>
          <div className={cx("title")}>
            <NavLink to="/all-products">
              <h4>New Products</h4>
            </NavLink>
          </div>
        </div>
        <NewProducts />
      </div>
    </div>
  );
};

export default Home;
