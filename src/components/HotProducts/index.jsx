import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { ProductCard } from "~/components";

// icons
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

// fake data
import productCards from "./fakeData.json";

// Slide show
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

let cx = classNames.bind(styles);

const HotProducts = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const cards = productCards.data;

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={0}
          // centeredSlidesBounds={true}
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
            768: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {cards.map((card) => (
            <SwiperSlide key={uuidv4()}>
              <ProductCard product={card} />
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

export default HotProducts;
