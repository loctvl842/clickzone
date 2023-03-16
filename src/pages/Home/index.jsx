import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { Navbar, HomeNav, HotProduct, NewProdcuts, Footer } from "~/components";

let cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("container")}>
      <Navbar />
      <div className={cx("content-wrapper")}>
        <HomeNav />
        <HotProduct />
        <NewProdcuts />
      </div>
      <Footer />
      <br/>
      <br/>
    </div>
  );
};

export default Home;
