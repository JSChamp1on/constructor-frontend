// libs
import React, { PureComponent, useRef } from "react";

// helpers
import { uniqueId } from "@helpers/uniqueId";

// styles
import styles from "./radiobutton.scss";
import fontSize from "@styles/fontSize.sass";

export const Radiobutton = (readonlyProps) => {
    const {
        name,
        value,
        label,
        ...props
    } = readonlyProps;

    const id = useRef(uniqueId.generate);

    if (props.checked !== undefined && props.onChange === undefined) {
        props.defaultChecked = props.checked;
        delete props.checked;
    }
    
    return (
        <div className={styles.wrapper}>
            <input type="radio" id={id.current} name={name} value={value} {...props} />
            <label htmlFor={id.current} className={fontSize.s14}>{ label }</label>
        </div>
    );
};
