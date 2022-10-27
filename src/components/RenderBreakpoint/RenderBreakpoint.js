// libs
import { useLayoutEffect, useState } from "react";

// styles
import breakpoint from "@styles/breakpoint.json";

export const breakpointBool = ({ rules }) => {
    const { innerWidth } = window;

    let render = false;

    for (let arr of rules) {
        if (arr.length === 2) {
            if (innerWidth > breakpoint[arr[0]] && innerWidth <= breakpoint[arr[1]]) {
                render = true;

                break;
            } else if (arr[0] === null && innerWidth <= breakpoint[arr[1]]) {
                render = true;
                
                break;
            } else if (innerWidth > breakpoint[arr[0]] && arr[1] === null) {
                render = true;

                break;
            }
        }
    }

    return render;
};

export const RenderBreakpoint = (readonlyProps) => {
    const {
        jsx,
        rules,
    } = readonlyProps;

    const [renderState, setRenderState] = useState(false);

    useLayoutEffect(() => {
        updateRender();

        window.addEventListener('resize', updateRender, false);

        return () => {
            window.removeEventListener('resize', updateRender, false);
        };
    }, []);
    
    const updateRender = () => {
        const result = breakpointBool({ rules });

        setRenderState(result);
    };

    return renderState ? jsx : null;
};
