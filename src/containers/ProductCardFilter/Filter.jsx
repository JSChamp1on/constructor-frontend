// libs
import React from "react";

// components
import { RenderBreakpoint, constants } from "@components/RenderBreakpoint";

// containers
import { DesktopMenu, DeviceMenu } from "@containers/ProductCardFilter";

const {
    SCREEN_NOTE,
} = constants;

export const Filter = ({filtersList}) => {
    if(!filtersList) {
        return <></>
    }

    return <>
        <RenderBreakpoint
            jsx={<DeviceMenu filtersList={filtersList}  />}
            rules={[[null, SCREEN_NOTE],]}
         />
        <RenderBreakpoint
            jsx={<DesktopMenu filtersList={filtersList}  />}
            rules={[[SCREEN_NOTE, null],]}
         />
    </>
};
