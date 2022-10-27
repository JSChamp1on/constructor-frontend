// libs
import React, { forwardRef } from "react";

// images
import arrowDown from "@images/arrowDown.svg";

// styles 
import styles from "./buttonMetamorphosis.scss";
import fontSize from "@styles/fontSize.sass";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

export const ButtonMetamorphosis = forwardRef((readonlyProps, ref) => {
    const {
        type,
        children,
        className,
        width,
        onClick,
        showbool,
    } = readonlyProps;

    return (
        <button 
            ref={ref} 
            type={type} 
            className={mergeClasses(styles.button, className, showbool && styles.show)} 
            style={{ width }} 
            onClick={onClick}
        >
            <span className={fontSize.s14}>{ children }</span>
            <img src={arrowDown} alt="" />
        </button>
    );
});
