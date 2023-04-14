import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Navbar, Footer, Paginator } from "~/components";

let cx = classNames.bind(styles);

const MainLayout = ({ content }) => {
  const PageContent = content;

  return (
    <div className={cx("container")}>
      <Navbar />
      <div id="page-content" className={cx("content-wrapper")}>
        <PageContent />
      </div>
      <center>
        <Paginator />
      </center>
      <Footer />
      <br />
    </div>
  );
};

export default MainLayout;
