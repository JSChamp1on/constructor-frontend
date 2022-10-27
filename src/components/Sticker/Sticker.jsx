// libs
import React from "react";

// styles
import styles from "./sticker.scss";
import fontSize from "@styles/fontSize.sass";

export const Sticker = (readonlyProps) => {
    const {
        label,
        children,
    } = readonlyProps;

    return (
        <div className={styles.wrapper}>
            {
                label
                && (
                    <span className={fontSize.s28}>{ label }</span>
                )
            }
            <div className={styles.area}>
                { children }
            </div>
        </div>
    );
};
