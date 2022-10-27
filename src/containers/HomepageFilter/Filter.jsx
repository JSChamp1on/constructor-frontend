// libs
import React from "react";

// containers
import { DesktopMenu, DeviceMenu } from "@containers/HomepageFilter";
import { RenderBreakpoint, constants } from "@components/RenderBreakpoint";

const {
    SCREEN_BOARD,
} = constants;

export const Filter = () => {
    return <>
        <RenderBreakpoint
            jsx={<DeviceMenu />}
            rules={[[null, SCREEN_BOARD],]}
         />
        <RenderBreakpoint
            jsx={<DesktopMenu />}
            rules={[[SCREEN_BOARD, null],]}
         />
    </>;
};
