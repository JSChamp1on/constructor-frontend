// libs
import React, { useLayoutEffect, useRef, useState } from "react";

// app
import { Portal } from "@app";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./tooltip.scss";

const changeVariable = {
    variable: null,
    subscription: Function(),
    set current (value) {
        this.variable = value;
        this.subscription(value);
    },
    get current () {
        return this.variable;
    },
    listener: function (subscription) {
        if (typeof subscription === 'function') {
            this.subscription = subscription;
        }
    },
};

export const Tooltip = (readonlyProps) => {
    const {
        children,
        tipJSX,
    } = readonlyProps;

    const ref = useRef(null);

    useLayoutEffect(() => {
        props.ref.current.addEventListener('mouseenter', mouseenter, false);
        props.ref.current.addEventListener('mouseleave', mouseleave, false);
        window.addEventListener('scroll', mouseleave, false);

        return () => {
            props.ref.current.removeEventListener('mouseenter', mouseenter, false);
            props.ref.current.removeEventListener('mouseleave', mouseleave, false);
            window.removeEventListener('scroll', mouseleave, false);
        };
    }, []);

    const
        mouseenter = () => {
            const bounding = props.ref.current.getBoundingClientRect();
            
            changeVariable.current = {
                tipJSX,
                bool: true,
                bounding,
            };
        },
        mouseleave = () => {
            changeVariable.current = {
                tipJSX,
                bool: false,
            };
        };

    const props = {
        ref: children.ref ?? ref,
        ...children.props,
    };

    return <children.type {...props} />;
};

export const tooltipUnmount = () => {
    changeVariable.current = {
        tipJSX: null,
        bool: false,
    };;
};

export const TooltipRender = () => {
    const ref = useRef(null);
    
    const [tipState, setTipState] = useState(null);
    const [boolPopupState, setBoolPopupState] = useState(false);
    const [styleState, setStyleState] = useState({});

    useLayoutEffect(() => {
        changeVariable.listener(listener);
    }, []);

    const listener = (obj) => {

        setTipState(obj.tipJSX);
        setBoolPopupState(obj.bool);

        const { current } = props?.ref;

        if (current && obj.tipJSX) {
            const bounding = current.getBoundingClientRect();
            
            setStyleState({
                top: obj.bounding.top - bounding.height - 8,
                left: obj.bounding.left,
            });
        }
    };

    const props = {
        ref: tipState?.ref ?? ref,
        ...tipState?.props,
        className: mergeClasses(tipState?.props.className, styles.popup),
        style: styleState,
    };
    
    return (
        <Portal>
            { boolPopupState ? <tipState.type {...props} /> : null }
        </Portal>
    );
};
