// libs
import React, { useEffect, useRef } from "react";

// app
import { Portal } from "@app";

// styles
import styles from "./modal.scss";

export const Modal = (readonlyProps) => {
    const {
        useOpen,
        children,
    } = readonlyProps;

    const backgroundElement = useRef(null);
    const closeTimeout = useRef(null);

    const [openBool, setOpenBool] = useOpen ?? [false, Function()];

    useEffect(() => {
        backgroundElement.current?.addEventListener('click', onClickArea, false);

        return () => {
            backgroundElement.current?.removeEventListener('click', onClickArea, false);
            clearTimeout(closeTimeout.current);
        };
    }, [openBool]);

    const onClickArea = (e) => {
        if (e.target.contains(backgroundElement.current)) {
            onClickTimeout();
        }
    };

    const onClickTimeout = () => {
        backgroundElement.current.style.opacity = '0';
        closeTimeout.current = setTimeout(() => {
            setOpenBool?.(false);
        }, 100);
    };

    const props = {
        ...children.props,
        onClick: onClickTimeout,
    };

    if (openBool) {
        return (
            <Portal>
                <div ref={backgroundElement} className={styles.background}>
                    <children.type {...props} />
                </div>
            </Portal>
        );
    }
    
    return null;
};