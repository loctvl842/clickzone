import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

import { Navbar, Footer, Paginator } from "~/components";
import { useNavbarFloat } from "~/hook";

let cx = classNames.bind(styles);

const MainLayout = ({ components }) => {
  const navbarFloat = useNavbarFloat();

  return (
    <div className={cx("container")}>
      <Navbar />
      <div className={cx("content-wrapper")} style={{ marginTop: navbarFloat ? 106 : 0 }}>
        {Array.isArray(components) ? components.map((c) => <Fragment key={uuidv4()}>{c}</Fragment>) : components}
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
