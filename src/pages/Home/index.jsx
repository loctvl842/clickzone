import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { HomeSlideShow, HotProduct, NewProducts } from "~/components";

// hook
import { useCurrentUser } from "~/hook";

import { NavLink } from "react-router-dom";

let cx = classNames.bind(styles);

const Home = () => {
  // useCurrentUser();

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
