// libs
import { cloneElement } from "react";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./maxWidthLazurit.scss";

export const MaxWidthLazurit = (readonlyProps) => {
    if (!readonlyProps.children) {
        return null;
    }

    if (
        typeof readonlyProps.children === 'object' 
        && typeof readonlyProps.children.type !== 'symbol'
    ) {
        const { className } = readonlyProps.children.props;

        return cloneElement(readonlyProps.children, { className: mergeClasses(styles.width, className) });
    }

    console.error("React children is not Element");
    
    return readonlyProps.children;
};