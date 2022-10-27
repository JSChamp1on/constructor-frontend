// libs
import React, {useCallback} from "react";

// images
import closeSmall from "@images/closeSmall.svg";

// styles 
import styles from "./buttonClearFilterMobile.scss";

export const ButtonClearFilterMobile = ({onClick, text}) => {
    const handleClick = useCallback((e) => {
        e.stopPropagation();
        onClick(e);
    }, [onClick]);

    return (
        <span
            className={styles.button}
            onClick={handleClick}
            role='button'
            tabIndex={0}
        >
            <span className={styles.button__text}>{text}</span>
            <img
                alt=""
                className={styles.button__image}
                src={closeSmall}
             />
        </span>
    );
}
