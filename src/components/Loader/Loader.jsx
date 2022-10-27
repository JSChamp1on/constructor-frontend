// libs
import React, { useEffect, useRef, useState } from "react";

// styles
import styles from "./loader.scss";

export const Loader = (readonlyProps) => {
    const timer = useRef(null);

    const [loaderState, setLoaderState] = useState(false);

    const keys = Object.keys(readonlyProps);
    const rpcKeys = [];

    for (let key of keys) if (/^rpc_.+$/.test(key)) rpcKeys.push(key);

    const decision = rpcKeys.some((key) => readonlyProps[key].done === -1 && readonlyProps[key].status === 0);

    useEffect(() => {
        if (decision) {
            timer.current = setTimeout(() => setLoaderState(true), 200);
        } else {
            clearTimeout(timer.current);

            setLoaderState(false);
        }

        return () => {
            clearTimeout(timer.current);
        };
    }, [decision]);

    if (loaderState) {
        return (
            <div className={styles.wrapper}>
                <hr />
                <hr />
                <hr />
                <hr />
            </div>
        );
    }

    return null;
};
