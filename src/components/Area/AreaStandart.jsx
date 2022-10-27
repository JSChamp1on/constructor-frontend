// libs
import React, { forwardRef } from "react";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./areaStandart.scss";

export const AreaStandart = forwardRef((readonlyProps, ref) => {
    const {
        width,
        height,
        showbool,
        outOfView,
    } = readonlyProps;

    return (
        <div ref={ref} className={styles.wrapper}>
            <div 
                className={mergeClasses(
                    styles.contour, 
                    showbool ? styles.show : styles.hidden,
                )} 
                style={{ 
                    width, 
                    right: outOfView && 0,
                }}
            >
                <div className={styles.content} style={{ width, maxHeight: height }}>
                    { readonlyProps.children }
                </div>
            </div>
        </div>
    );
});
