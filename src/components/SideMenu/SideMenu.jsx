// libs
import React, { useEffect, useRef } from "react";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// images
import closeSVG from "@images/close.svg";

// styles
import styles from "./sideMenu.scss";
import fontSize from "@styles/fontSize.sass";
import buttonStyles from "@styles/button";

export const SideMenu = (readonlyProps) => {
    const {
        label,
        children,
        useOpen,
        onClick,
    } = readonlyProps;

    const coverElement = useRef(null);

    useEffect(() => {
        document.addEventListener('click', closeSideMenu, false);

        return () => {
            document.removeEventListener('click', closeSideMenu, false);
        };
    }, []);

    const [openBool, setOpenBool] = useOpen;

    const closeSideMenu = (e) => {
        const clickOnCover = coverElement.current?.contains(e.target);

        if (clickOnCover) {
            setOpenBool(false);
        }
    };

    const 
        onClickImg = () => {
            setOpenBool(false);
        },
        onClickButton = (e) => {
            onClick?.(e);
            setOpenBool(false);
        };

    return <>
        <div ref={coverElement} className={mergeClasses(styles.cover, openBool && styles.show)} />
        <div className={mergeClasses(styles.wrapper, openBool && styles.show)}>
            <div className={styles.label}>
                <span className={fontSize.s18}>{ label }</span>
                <button type="button" onClick={onClickImg}>
                    <img src={closeSVG} alt="" />
                </button>
            </div>
            <div className={styles.content}>
                <div>
                    { children }
                </div>
            </div>
            <div className={styles.button}>
                <button type="submit" className={buttonStyles.blue} onClick={onClickButton}>
                    <span className={fontSize.s16}>Показать</span>
                </button>
            </div>
        </div>
    </>;
};
