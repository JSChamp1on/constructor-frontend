// libs
import React, { forwardRef } from "react";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./areaSideMenu.scss";

export const AreaSideMenu = forwardRef((readonlyProps, ref) => {
    const {
        width,
        height,
        showbool,
    } = readonlyProps;

    return (
        <div ref={ref} className={styles.wrapper}>
            <div className={mergeClasses(styles.contour, !showbool && styles.hidden)} style={{ width }}>
                <div className={styles.content} style={{ width, height }}>
                    { readonlyProps.children }
                </div>
            </div>
        </div>
    );
});
