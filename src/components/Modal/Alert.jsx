// libs
import React, { useEffect } from "react";

// styles
import styles from "./alert.scss";
import buttonStyles from "@styles/button";

export const Alert = (readonlyProps) => {
    const {
        children,
        onClick,
    } = readonlyProps;

    useEffect(() => {
        document.body.querySelector('#root > div:nth-child(1)').style.cssText = `
            position: fixed;
            overflow: hidden;
            left: 0;
            right: 0;
        `;

        return () => {
            document.body.querySelector('#root > div:nth-child(1)').style.cssText = '';
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            { children }
            <div className={styles.confirm}>
                <button type="button" className={buttonStyles.blue} width="250" onClick={onClick}>OK</button>
            </div>
        </div>
    );
};
