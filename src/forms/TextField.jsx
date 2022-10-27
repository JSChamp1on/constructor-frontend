// libs
import React, { forwardRef, useRef } from "react";

// helpers
import { uniqueId } from "@helpers/uniqueId";
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./textField.scss";

export const TextField = forwardRef((readonlyProps, ref) => {
    const {
        error,
        label,
        value,
        ...props
    } = readonlyProps;

    const id = useRef(uniqueId.generate);

    const val = value ?? '';

    return (
        <div className={mergeClasses(styles.wrapper, error && styles.invalid)}>
            <input ref={ref} id={id.current} className={val.length ? styles.filled : null} value={val} {...props} />
            <label htmlFor={id.current}>{ label }</label>
            <span>{ error?.message || 'Заполните поле' }</span>
        </div>
    );
});
