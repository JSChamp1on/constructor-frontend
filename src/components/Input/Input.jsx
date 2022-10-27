// libs
import React, { useRef } from "react";

// helpers
import { uniqueId } from "@helpers/uniqueId";

// styles
import styles from "./input.scss";
import fontSize from "@styles/fontSize.sass";

export const Input = (readonlyProps) => {
    const {
        jsx,
        type,
        name,
        label,
        taborder,
    } = readonlyProps;

    const id = useRef(uniqueId.generate);

    return (
        <div 
            className={jsx ? styles.inputAndIcon : styles.input}>
            { jsx }
            <input type={type} id={id.current} name={name} taborder={taborder} required />
            <label htmlFor={id.current} className={fontSize.s16}>{ label }</label>
        </div>
    );
};