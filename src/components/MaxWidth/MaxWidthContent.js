/**
 * This class looks so that, if possible, it does not create an unnecessary wrapping DOM element.
 */

// libs
import { cloneElement, createElement } from "react";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./maxWidthContent.scss";

export const MaxWidthContent = (readonlyProps) => {
    const clone = (element, props) => {
        if (typeof element === 'object' && typeof element.type !== 'symbol') {
            return cloneElement(element, props);
        }

        return element;
    };
    
    if (Array.isArray(readonlyProps.children)) {
        const 
            children = readonlyProps.children.map((item, index) => {
                const 
                    element = { 
                        ...item, 
                        key: index,
                    },
                    props = {
                        className: item.props.className,
                    };

                return clone(element, props);
            }),
            props = {
                className: styles.width,
            };

        return createElement('div', props, children);
    }

    const 
        element = readonlyProps.children,
        props = {
            className: mergeClasses(styles.width, element.props?.className),
        };

    return clone(element, props);
};
