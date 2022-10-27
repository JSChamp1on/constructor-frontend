// libs
import React, { useEffect, useRef } from "react";

// app
import { Portal } from "@app";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./panel.scss";
import fontSize from "@styles/fontSize.sass";
import buttonStyles from "@styles/button";

export const Panel = (readonlyProps) => {
    const {
        children,
        useOpen,
    } = readonlyProps;

    const backgroundElement = useRef(null);

    const [openBool, setOpenBool] = useOpen ?? [false, Function];

    useEffect(() => {
        backgroundElement.current?.addEventListener('click', onClickArea, false);

        return () => {
            backgroundElement.current?.removeEventListener('click', onClickArea, false);
        };
    }, [openBool]);

    const onClickArea = (e) => {
        if (e.target.contains(backgroundElement.current)) {
            setOpenBool?.(false);
        }
    };

    if (openBool) {
        return (
            <Portal>
                <div ref={backgroundElement} className={styles.background}>
                    <div className={styles.panel}>
                        <hr className={styles.hr}/>
                        <div className={styles.context}>
                            { children }
                        </div>
                        <button type="button" className={mergeClasses(styles.button, buttonStyles.blue)} onClick={() => setOpenBool?.(false)}>
                            <span className={fontSize.s16}>Закрыть</span>
                        </button>
                    </div>
                </div>
            </Portal>
        );
    }
    
    return null;
};
