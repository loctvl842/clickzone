import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { ProductCard } from "~/components";

// key index
import { v4 as uuidv4 } from "uuid";

// Slide show
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

let cx = classNames.bind(styles);

const HotProdcuts = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <div className={cx("container")}>
      <div className={cx("swiper-wrapper")}>
        <div className={cx("title")}>
          <h4>Hot Product</h4>
        </div>
        <Swiper
          modules={[Navigation]}
          slidesPerView={4}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
        >
          {cards.map((card) => (
            <SwiperSlide key={uuidv4()}>
              <ProductCard data={card} />
            </SwiperSlide>
          ))}
          <button type="button" ref={navigationNextRef}>
            next
          </button>
          <button type="button" ref={navigationPrevRef}>
            prev
          </button>
        </Swiper>
      </div>
    </div>
  );
};

export default HotProdcuts;
