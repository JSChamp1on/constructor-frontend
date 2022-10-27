// libs
import React from "react";
import { Link as A } from "react-router-dom";

export const Link = (readonlyProps) => {
    const props = { ...readonlyProps };
    const to = readonlyProps.href ?? '#';

    if (/^https?:\/\/|^tel:/.test(props.href)) {
        return <a {...props} />;
    }

    delete props.href;

    return <A to={to} {...props} />;
};
