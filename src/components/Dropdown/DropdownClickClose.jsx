// libs
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export const DropdownClickClose = (readonlyProps) => {
    const {
        className,
        ButtonJSX,
        AreaJSX,
    } = readonlyProps;

    const 
        wrapperElement = useRef(null),
        buttonElement = useRef(null),
        areaElement = useRef(null);

    const 
        [areaShowState, setAreaShowState] = useState(false),
        [outOfViewState, setOutOfViewState] = useState(false);

    useEffect(() => {
        document.addEventListener('click', closeDropArea, false);

        return () => {
            document.removeEventListener('click', closeDropArea, false);
        };
    }, []);

    useLayoutEffect(() => {
        offScreen();
    }, [areaShowState]);

    useLayoutEffect(() => {
        if (!outOfViewState) {
            offScreen();
        }
    }, [outOfViewState]);

    const closeDropArea = (e) => {
        const 
            clickOnBox = areaElement.current?.contains(e.target),
            clickOnButton = buttonElement.current?.contains(e.target);

        if (!clickOnBox && !clickOnButton) {
            setAreaShowState(false);
        }
    };

    const offScreen = () => {
        const beyond = (
            areaElement.current?.scrollWidth 
            + wrapperElement.current?.offsetLeft 
            - document.body.offsetWidth 
            + 15
        );
        setOutOfViewState(beyond >= 0);
    };

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
        outOfView: outOfViewState,
    };

    return (
        <div ref={wrapperElement} className={className}>
            <ButtonJSX.type {...propsButton} />
            <AreaJSX.type {...propsArea} />
        </div>
    );
};
