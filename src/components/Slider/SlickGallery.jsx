// libs
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";

// components
import { SwiperAuto } from "@components/Slider";
import { breakpointBool, constants } from "@components/RenderBreakpoint";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./slickGallery.scss";

const {
    SCREEN_BOARD,
} = constants;

export const SlickGallery = (readonlyProps) => {
    const {
        children,
        paging,
        mouseEvent,
    } = readonlyProps;

    const wrapperElement = useRef(null);

    const [onSwiperState, setOnSwiperState] = useState(null);
    const [cerrentSlideState, setCurrentSlideState] = useState(0);

    useEffect(() => {
        const slickList = el();
        
        if (children) {
            slickList.addEventListener('mousemove', mousemove, false);
            slickList.addEventListener('mouseleave', mouseleave, false);
        }

        return () => {
            slickList.removeEventListener('mousemove', mousemove, false);
            slickList.removeEventListener('mouseleave', mouseleave, false);
        };
    }, [children, onSwiperState]);

    useEffect(() => {
        if (onSwiperState) {
            onSwiperState.on('slideChange', ({ activeIndex }) => {
                slideTo(activeIndex);
            });
        }
    }, [onSwiperState]);

    const 
        el = () => wrapperElement.current,
        breakpoint = () => breakpointBool({ rules: [[SCREEN_BOARD, null],] }),
        mousemove = (e) => {
            if (!mouseEvent) 
                return null;

            const elBounding = el().getBoundingClientRect();
            const slidesCount = children.length;

            const oneSlideSize = elBounding.width / slidesCount;
            const clientX = e.clientX - elBounding.left;
            const slideIndex = Math.floor(clientX / oneSlideSize);
            
            if (slideIndex >= 0) {
                slideTo(slideIndex);
            }
        },
        mouseleave = () => {
            if (!mouseEvent) 
                return null;
            
            slideTo(0);
        };

    const slideTo = (index) => {
        onSwiperState.slideTo(index);
        setCurrentSlideState(index);
    };

    const settings = {
        initialSlide: 0,
        navigation: !mouseEvent,
        modules: [Navigation],
        onSwiper: setOnSwiperState,
    };
    
    return (
        <div className={styles.wrapper}>
            <div ref={wrapperElement} className={styles.slider}>
                {
                    children
                    && (
                        <Swiper {...settings}>
                            {
                                children.map((Element, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <Element.type {...Element.props} />
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                    )
                }
            </div>
            <div className={styles.pagination}>
                {
                    mouseEvent || !breakpoint()
                        ? (
                            <ul>
                                {
                                    children
                                    && new Array(children.length).fill(null).map((_, index) => {
                                        return (
                                            <li 
                                                key={index} 
                                                className={index === cerrentSlideState ? styles.active : null} 
                                                onClick={() => slideTo(index)}
                                            />
                                        );
                                    })
                                }
                            </ul>
                        )
                        : Array.isArray(paging) && (
                            <div>
                                <SwiperAuto spaceBetween={16}>
                                    {
                                        paging.map((Element, index) => {
                                            const props = {
                                                ...Element.props,
                                            };

                                            return (
                                                <div 
                                                    key={index} 
                                                    className={mergeClasses(styles.page, index === cerrentSlideState ? styles.active : null)}
                                                    onClick={() => slideTo(index)}
                                                >
                                                    <Element.type {...props} />
                                                </div>
                                            );
                                        })
                                    }
                                </SwiperAuto>
                            </div>
                        )
                }
            </div>
        </div>
    );
}
