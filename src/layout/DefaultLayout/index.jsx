import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

import { Navbar, Footer } from "~/components";

let cx = classNames.bind(styles);

const DefaultLayout = ({ components }) => {
  return (
    <div className={cx("container")}>
      <Navbar />
      <div className={cx("content-wrapper")}>
        {Array.isArray(components)
          ? components.map((c) => <Fragment key={uuidv4()}>{c}</Fragment>)
          : components}
      </div>
      <Footer />
      <br />
      <br />
    </div>
  );
};

export default DefaultLayout;
