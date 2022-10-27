// libs
import React, { forwardRef } from "react";

// images
import arrowDown from "@images/arrowDown.svg";

// styles 
import styles from "./buttonSideMenu.scss";
import fontSize from "@styles/fontSize.sass";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

export const ButtonSideMenu = forwardRef((readonlyProps, ref) => {
    const {
        appliedFilters,
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
            <span className={mergeClasses(styles.button__contentBlock, fontSize.s14)}>
                <span>{ children }</span>
                {
                    appliedFilters
                        ?
                        <span className={styles.button__appliedFiltersBlock}>
                            {appliedFilters}
                        </span>
                        : <></>
                }
            </span>
            <img src={arrowDown} alt="" />
        </button>
    );
});
