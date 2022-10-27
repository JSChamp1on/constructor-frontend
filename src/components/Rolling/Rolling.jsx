// libs
import React, { useEffect, useRef, useState } from "react";

// components
import { InputPrice } from "@components/Input";
import { Range } from "@components/Range";

// styles
import styles from "./rolling.scss";

export const Rolling = (readonlyProps) => {
    const {
        name = Array(2),
        initialValue = Array(2),
        defaultValue = Array(2),
        dotMouseUp = Function,
    } = readonlyProps;

    const initial = useRef(true);
    const 
        minValueSave = useRef(Number(defaultValue[0])),
        maxValueSave = useRef(Number(defaultValue[1]));
    const
        minInputElement = useRef(null),
        maxInputElement = useRef(null);

    const 
        [valueMinState, setValueMinState] = useState(defaultValue[0] ?? 0),
        [valueMaxState, setValueMaxState] = useState(defaultValue[1] ?? 0);

    useEffect(() => {
        if (initial.current) {
            initial.current = false;

            setValueMinState(defaultValue[0]);
            setValueMaxState(defaultValue[1]);
        }

        setValueMinState(initialValue[0] ?? defaultValue[0]);
        setValueMaxState(initialValue[1] ?? defaultValue[1]);
    }, [defaultValue[0], defaultValue[1], initialValue[0], initialValue[1]]);

    const checkValue = (target) => {
        const value = Number(target.value.replace(/\D/g, ''));

        return (
            !value 
            || value > valueMaxState 
            || value < valueMinState 
            || value > maxValueSave.current 
            || value < minValueSave.current
        );
    };

    const focusClearClass = ({ target }) => {
        if (target.classList.contains(styles.err)) {
            target.classList.remove(styles.err);
        }
    };

    const
        minChange = ({ target }) => {
            const value = Number(target.value.replace(/\D/g, ''));
            
            setValueMinState(value);

            if (checkValue(maxInputElement.current)) {
                focusClearClass({ target: maxInputElement.current });
            }
        },
        maxChange = ({ target }) => {
            const value = Number(target.value.replace(/\D/g, ''));
            
            setValueMaxState(value);

            if (checkValue(minInputElement.current)) {
                focusClearClass({ target: minInputElement.current });
            }
        };

    const 
        minBlur = ({ target }) => {
            if (checkValue(target)) {
                if (!target.classList.contains(styles.err)) {
                    target.classList.add(styles.err);
                }
            }
        },
        maxBlur = ({ target }) => {
            if (checkValue(target)) {
                if (!target.classList.contains(styles.err)) {
                    target.classList.add(styles.err);
                }
            }
        };

    const rangeDotMouseUp = () => {
        dotMouseUp();
    };

    return (
        <div className={styles.wrapper}>
            <Range
                value={[
                    valueMinState ?? 0, 
                    valueMaxState ?? 0,
                ]}
                onChange={([min, max]) => {
                    setValueMinState(min);
                    setValueMaxState(max);
                }}
                dotMouseUp={rangeDotMouseUp}
            />
            <InputPrice 
                ref={minInputElement} 
                className={styles.err}
                name={name[0]}
                label="от" 
                placeholder={defaultValue[0]} 
                value={valueMinState ?? 0} 
                onFocus={focusClearClass} 
                onChange={minChange} 
                onBlur={minBlur}
            />
            <InputPrice 
                ref={maxInputElement} 
                name={name[1]} 
                label="до" 
                placeholder={defaultValue[1]} 
                value={valueMaxState ?? 0} 
                onFocus={focusClearClass} 
                onChange={maxChange} 
                onBlur={maxBlur}
            />
        </div>
    );
};
