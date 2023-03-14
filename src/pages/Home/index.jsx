import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { Navbar, HomeNav, HotProduct } from "~/components";

let cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("container")}>
      <Navbar />
      <div className={cx("content-wrapper")}>
        <HomeNav />
        <HotProduct />
      </div>
    </div>
  );
};

export default Home;
