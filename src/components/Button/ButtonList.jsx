// libs
import React, { forwardRef } from "react";

// components
import { RenderBreakpoint, constants } from "@components/RenderBreakpoint";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// images
import arrowDown from "@images/arrowDown.svg";

// styles
import styles from "./buttonList.scss";
import fontSize from "@styles/fontSize.sass";
import breakpoint from "@styles/breakpoint.json";

const {
    SCREEN_NOTE,
} = constants;

export const ButtonList = forwardRef((readonlyProps, ref) => {
    const {
        type,
        children,
        className,
        width,
        onClick,
        showbool,
    } = readonlyProps;

    const screenNote = window.innerWidth >= breakpoint['screen-note'] ? fontSize.s24 : fontSize.s18;

    return (
        <button 
            ref={ref} 
            type={type}
            className={mergeClasses(styles.button, className, showbool && styles.show)} 
            style={{ width }} 
            onClick={onClick}
        >
            <RenderBreakpoint
                jsx={<span className={fontSize.s18}>{ children }</span>} 
                rules={[[null, SCREEN_NOTE],]}
            />
            <RenderBreakpoint
                jsx={<span className={fontSize.s24}>{ children }</span>} 
                rules={[[SCREEN_NOTE, null],]}
            />
            <img src={arrowDown} alt="" />
        </button>
    );
});
