// libs
import React, { useEffect, useRef } from "react";

// components
import { Move } from "@components/Move";

// styles
import styles from "./dragging.scss";

export const Dragging = (readonlyProps) => {
    const {
        children,
    } = readonlyProps;

    const 
        wrapperElement = useRef(null),
        draggingElement = useRef(null);

    useEffect(() => {
        window.addEventListener('resize', draggingStart, false);

        return () => {
            window.removeEventListener('resize', draggingStart, false);
        };
    }, []);

    const draggingStart = () => {
        draggingElement.current.style.left = '';
    };

    const onChange = ({ x }) => {
        const wrapper = wrapperElement.current.getBoundingClientRect();

        let position = Number(draggingElement.current.style.left.replace(/px$/, ''));
        position += x;
        
        if (0 > position && wrapper.x + wrapper.width <= wrapper.x + draggingElement.current.scrollWidth + position) {
            draggingElement.current.style.left = `${position}px`;
        }
    };

    return (
        <Move fwdref={wrapperElement} onChange={onChange}>
            <div className={styles.wrapper}>
                <div ref={draggingElement}>
                    { children }
                </div>
            </div>
        </Move>
    );
};
