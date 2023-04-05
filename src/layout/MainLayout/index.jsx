import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Navbar, Footer } from "~/components";

let cx = classNames.bind(styles);

const MainLayout = ({ components }) => {
  const [navbarFloat, setNavbarFloat] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 106) {
      setNavbarFloat(true);
    } else {
      setNavbarFloat(false);
    }
  });
  return (
    <div className={cx("container")}>
      <Navbar />
      <div className={cx("content-wrapper")} style={{ marginTop: navbarFloat ? 106 : 0 }}>
        {Array.isArray(components) ? components.map((c) => <Fragment key={uuidv4()}>{c}</Fragment>) : components}
      </div>
      <Footer />
      <br />
    </div>
  );
};

export default MainLayout;
