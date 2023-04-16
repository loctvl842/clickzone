import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Navbar, Footer } from "~/components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCartItems } from "~/store/cartSlice";

let cx = classNames.bind(styles);

const ProductCartLayout = ({ content }) => {
  const PageContent = content;
  const dispatch = useDispatch();
  const shoppingSession = useSelector((state) => state.user.session);

  useEffect(() => {
    if (shoppingSession && shoppingSession.id) {
      dispatch(fetchCartItems(shoppingSession.id));
    }
  }, [dispatch, shoppingSession]);

  return (
    <div className={cx("container")}>
      <Navbar />
      <div id="page-content" className={cx("content-wrapper")}>
        <PageContent />
      </div>
      <Footer />
      <br />
    </div>
  );
};

export default ProductCartLayout;
