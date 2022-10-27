// libs
import React, { useEffect, useState } from "react";

// styles
import styles from "./count.scss";
import fontSize from "@styles/fontSize.sass";

const 
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT',
    DEFAULT_VALUE_STATE = '1';

export const Count = (readonlyProps) => {
    const {
        onChange,
    } = readonlyProps;

    const [valueState, setValueState] = useState(DEFAULT_VALUE_STATE);

    useEffect(() => onChange?.(valueState), [valueState]);

    const buttonHandler = (key) => {
        let value = Number(valueState);

        switch (key) {
            case DECREMENT: value--; break;
            case INCREMENT: value++;
        }

        if (value > 0) {
            setValueState(String(value));
        }
    };

    const inputHandlerChange = ({ target }) => {
        setValueState(target.value.replace(/\D/g, ''));
    };

    const inputHandlerBlur = () => {
        if (Number(valueState) <= 1) {
            setValueState(DEFAULT_VALUE_STATE);
        }
    };

    return (
        <div className={styles.wrapper}>
            <button type="button" onClick={buttonHandler.bind(null, DECREMENT)} disabled={Number(valueState) <= 1} aria-label={INCREMENT}>
                <svg role="img" aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <rect width="14" height="2" x="2" y="8" strokeWidth="0" fill="#003C7E" />
                </svg>
            </button>
            <label>
                <input type="text" className={fontSize.s16} value={valueState} onChange={inputHandlerChange} onBlur={inputHandlerBlur} />
            </label>
            <button type="button" onClick={buttonHandler.bind(null, INCREMENT)} disabled={valueState === ''} aria-label={DECREMENT}>
                <svg role="img" aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <rect width="14" height="2" x="2" y="8" strokeWidth="0" fill="#003C7E" />
                    <rect width="2" height="14" x="8" y="2" strokeWidth="0" fill="#003C7E" />
                </svg>
            </button>
        </div>
    );
};
