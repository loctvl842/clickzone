import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { ProductCard } from "~/components";

// key index
import { v4 as uuidv4 } from "uuid";

// icons
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

// Slide show
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

let cx = classNames.bind(styles);

const HotProdcuts = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h4>Hot Product</h4>
      </div>
      <div className={cx("swiper-wrapper")}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          // centeredSlidesBounds={true}
          spaceBetween={28}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // Override prevEl & nextEl now that refs are defined
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            // Re-init navigation
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            992: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
          }}
        >
          {cards.map((card) => (
            <SwiperSlide key={uuidv4()}>
              <ProductCard data={card} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={cx("btn")}>
          <div className={cx("btn__frame", "btn--prev")} ref={prevRef}>
            <ArrowBackIosNew style={{ fontSize: 24 }} />
          </div>
          <div className={cx("btn__frame", "btn--next")} ref={nextRef}>
            <ArrowForwardIos style={{ fontSize: 24 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotProdcuts;
