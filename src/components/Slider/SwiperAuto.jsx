// libs
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// styles
import styles from "./swiperAuto.scss";

export const SwiperAuto = (readonlyProps) => {
    const {
        children,
    } = readonlyProps;

    const settings = {
        spaceBetween: 8,
        slidesPerView: 'auto',
        className: styles.wrapper,
        ...readonlyProps.settings,
    };

    return (
        <Swiper {...settings}>
            {
                Array.isArray(children)
                    ? children.map((item, index) => (
                        <SwiperSlide key={index}>{ item }</SwiperSlide>
                    ))
                    : <SwiperSlide>{ children }</SwiperSlide>
            }
        </Swiper>
    );
};