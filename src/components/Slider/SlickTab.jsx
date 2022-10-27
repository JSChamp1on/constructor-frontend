// libs
import React from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";

// styles 
import styles from "./slickTab.scss";

export const SlickTab = (readonlyProps) => {
    const {
        children,
        useChange,
    } = readonlyProps;

    const [slideIndex, setSlideIndex] = useChange;
    
    const settings = {
        className: styles.wrapper,
        dots: false,
        lazyLoad: false,
        infinite: false,
        arrows: false,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false,
        autoplay: false,
        adaptiveHeight: true,
        draggable: true,
        focusOnSelect: false,
        beforeChange: (_, newIndex) => setSlideIndex?.(newIndex),
    };

    return (
        <Slick ref={(slide) => slide?.slickGoTo?.(slideIndex)} {...settings}>
            { children }
        </Slick>
    );
};
