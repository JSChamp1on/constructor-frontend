// libs
import React from "react";
import "regenerator-runtime/runtime";

// app
import { Redux, Router } from "@app";

// components
import { TooltipRender } from "@components/Tooltip";

// styles
import "@styles/global.sass";

export const App = () => <>
    <Redux>
        <Router />
    </Redux>
    <TooltipRender />
</>;

process.env.NODE_ENV === 'production' && console.log(
    `%cTD Lazurit Constructor v${process.env.VERSION}`,
    `
        padding: 12px 6px; 
        color: white; 
        background: #1257a1; 
        border-radius: 40% 0 40% 0; 
        font-size: 10px
    `
);
