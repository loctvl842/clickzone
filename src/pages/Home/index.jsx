import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { Navbar } from "~/components";

let cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("container")}>
      <Navbar />
    </div>
  );
};

export default Home;
