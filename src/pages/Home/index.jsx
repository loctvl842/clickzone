import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { HomeSlideShow, HotProduct, NewProducts } from "~/components";
// providers
import { PersistUser } from "~/providers";

import { NavLink } from "react-router-dom";

let cx = classNames.bind(styles);

const Home = () => {
  return (
    <PersistUser requireLoggedIn={false}>
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
    </PersistUser>
  );
};

export default Home;
