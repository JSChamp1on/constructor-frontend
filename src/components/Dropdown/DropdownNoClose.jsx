// libs
import React, { useRef, useState } from "react";

export const DropdownNoClose = (readonlyProps) => {
    const {
        className,
        ButtonJSX,
        AreaJSX,
    } = readonlyProps;

    const 
        buttonElement = useRef(null),
        areaElement = useRef(null);

    const [areaShowState, setAreaShowState] = useState(false);

    const onClick = (e) => {
        ButtonJSX.props.onClick?.(e);
        setAreaShowState(!areaShowState);
    };

    const propsButton = {
        ...ButtonJSX.props,
        ref: buttonElement,
        showbool: areaShowState ? 1 : 0,
        onClick,
    };

    const propsArea = {
        ...AreaJSX.props,
        ref: areaElement,
        showbool: areaShowState ? 1 : 0,
    };

    return (
        <div className={className}>
            <ButtonJSX.type {...propsButton} />
            <AreaJSX.type {...propsArea} />
        </div>
    );
};
