// libs
import React, { useEffect, useState } from "react";

// styles
import styles from "./switch.scss";

export const Switch = (readonlyProps) => {
    const {
        onChange,
    } = readonlyProps;

    const [switchState, setSwitchState] = useState(true);

    useEffect(() => onChange?.(!switchState), [switchState]);

    const onClick = () => setSwitchState(!switchState);

    const 
        wrapperStyle = {
            backgroundColor: switchState ? '#86B4E7' : '#C4C4C4',
        },
        switchStyle = {
            left: switchState ? 17 : 1,
        };

    return (
        <div className={styles.wrapper} style={wrapperStyle} onClick={onClick}>
            <div style={switchStyle} />
        </div>
    );
};
