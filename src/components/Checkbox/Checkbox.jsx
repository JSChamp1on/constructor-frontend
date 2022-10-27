// libs
import React, { useRef } from "react";

// helpers
import { uniqueId } from "@helpers/uniqueId";

// styles
import styles from "./checkbox.scss";
import fontSize from "@styles/fontSize.sass";

export const Checkbox = (readonlyProps) => {
    const {
        name,
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
            <input type="checkbox" id={id.current} name={name} {...props} />
            <label htmlFor={id.current} className={fontSize.s14}>{ label }</label>
        </div>
    );
};
