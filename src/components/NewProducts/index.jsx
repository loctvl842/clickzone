import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { ProductCard, Paginator } from "~/components";

// icons
import { AddCircle } from "@mui/icons-material";

// fake data
import productCards from "./fakeData.json";

import { v4 as uuidv4 } from "uuid";

let cx = classNames.bind(styles);

const NewProducts = () => {
  const cards = productCards.data;

  return (
    <div className={cx("container")}>
      <div className={cx("product-list")}>
        <div key={uuidv4()} className={cx("product-item")}>
          <div className={cx("new-product-btn")}>
            <div className={cx("add-btn-wrapper")}>
              <div className={cx("add-btn")}>
                <AddCircle style={{ fontSize: 100, userSelect: "none" }} />
              </div>
            </div>
            <div className={cx("fake-product-item")}>
              <span className={cx("fake-img-wrapper")}></span>
              <p className={cx("fake-price-sale")}></p>
              <span className={cx("fake-name")}></span>
            </div>
          </div>
        </div>
        {cards.map((card) => (
          <div key={uuidv4()} className={cx("product-item")}>
            <ProductCard data={card} />
          </div>
        ))}
      </div>
      <center>
        <Paginator />
      </center>
    </div>
  );
};

export default NewProducts;
