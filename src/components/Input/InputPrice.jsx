// libs
import React, { forwardRef, useRef } from "react";

// instances
import { uniqueId } from "@helpers/uniqueId";

// styles
import styles from "./inputPrice.scss";
import fontSize from "@styles/fontSize.sass";

export const InputPrice = forwardRef((readonlyProps, fwdref) => {
    const {
        name,
        label,
        placeholder,
        taborder,
        value,
        defaultValue,
        onFocus,
        onChange,
        onBlur,
    } = readonlyProps;
    
    const id = useRef(uniqueId.generate);

    return (
        <div className={styles.wrapper}>
            <input 
                ref={fwdref}
                type="text" 
                className={fontSize.s18} 
                id={id.current} 
                name={name} 
                placeholder={placeholder} 
                taborder={taborder} 
                value={value} 
                defaultValue={defaultValue}
                onFocus={onFocus}
                onChange={onChange} 
                onBlur={onBlur}
                required
             />
            <label htmlFor={id.current} className={fontSize.s14}>{ label }</label>
        </div>
    );
});
