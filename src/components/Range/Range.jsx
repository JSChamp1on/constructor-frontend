// libs
import React, { useRef } from "react";
import Slider from "rc-slider";

// styles
import styles from "./range.scss";

export const Range = (readonlyProps) => {
    const {
        value = Array(2),
        onChange = Function,
        dotMouseUp = Function,
    } = readonlyProps;

    const 
        minValueSave = useRef(value[0]),
        maxValueSave = useRef(value[1]);

    const 
        calculatorPercentOfNumber = (min, max, num) => {
            return Math.round((num - min) / (max - min) * 100);
        },
        calculatorNumberOfProcent = (min, max, pct) => {
            return Math.round(max - ((max - min) * (100 - pct) / 100));
        };

    const changeHandler = ([min, max]) => {
        onChange?.([
            calculatorNumberOfProcent(minValueSave.current, maxValueSave.current, min),
            calculatorNumberOfProcent(minValueSave.current, maxValueSave.current, max),
        ]);
    };

    return (
        <Slider 
            className={styles.wrapper} 
            range 
            allowCross={false} 
            value={[
                calculatorPercentOfNumber(minValueSave.current, maxValueSave.current, value[0]),
                calculatorPercentOfNumber(minValueSave.current, maxValueSave.current, value[1]),
            ]}
            defaultValue={[0, 100]}
            onChange={changeHandler}
            onAfterChange={dotMouseUp}
        />
    );
};
