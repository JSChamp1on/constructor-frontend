// libs
import React, { useEffect, useRef } from "react";

// components
import { breakpointBool, RenderBreakpoint, constants } from "@components/RenderBreakpoint";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// images
import closeSVG from "@images/close.svg";
import arrowSVG from "@images/arrow.svg";

// styles
import styles from "./area.scss";
import fontSize from "@styles/fontSize.sass";

const {
    SCREEN_NOTE,
} = constants;

export const Area = (readonlyProps) => {
    const {
        children,
        onClick,
        className,
    } = readonlyProps;

    const wrapperElement = useRef(null);
    const closeTimeout = useRef(null);

    useEffect(() => {
        document.body.querySelector('#root > div:nth-child(1)').style.cssText = `
            position: fixed;
            overflow: hidden;
            left: 0;
            right: 0;
        `;

        return () => {
            document.body.querySelector('#root > div:nth-child(1)').style.cssText = '';
            clearTimeout(closeTimeout.current);
        };
    }, []);

    const onClickTimeout = (e) => {
        if (breakpointBool({ rules: [[null, SCREEN_NOTE],] })) {
            wrapperElement.current.style.left = '-100vw';
            closeTimeout.current = setTimeout(() => {
                onClick(e);
            }, 200);

            return null;
        }
        
        onClick(e);
    };
    
    return (
        <div ref={wrapperElement} className={mergeClasses(styles.wrapper, className)}>
            <button type="button" className={styles.close} onClick={onClickTimeout}>
                <RenderBreakpoint
                    jsx={<>
                        <img src={arrowSVG} alt="back" />
                        <span className={fontSize.s14}>Назад</span>
                    </>}
                    rules={[[null, SCREEN_NOTE],]}
                />
                <RenderBreakpoint
                    jsx={<>
                        <img src={closeSVG} alt="Закрыть" />
                    </>}
                    rules={[[SCREEN_NOTE, null],]}
                />
            </button>
            <div className={styles.children}>
                { children }
            </div>
        </div>
    );
};