import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Navbar, Footer } from "~/components";

let cx = classNames.bind(styles);

const ProductCartLayout = ({ content }) => {
  const PageContent = content;
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
