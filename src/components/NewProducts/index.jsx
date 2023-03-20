import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { ProductCard, Paginator } from "~/components";

// fake data
import productCards from "./fakeData.json";

import { v4 as uuidv4 } from "uuid";

let cx = classNames.bind(styles);

const NewProducts = () => {
  const cards = productCards.data;

  return (
    <div className={cx("container")}>
      <div className={cx("product-list")}>
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
