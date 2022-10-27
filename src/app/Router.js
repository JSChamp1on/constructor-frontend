// libs
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// app
import { paths } from "@app";

// components
import { Body } from "@components/Body";

// pages
import { NotFound } from "@pages/NotFound";

export const Router = (readonlyProps) => (
    <BrowserRouter basename={process.env.BASE_PATH} {...readonlyProps}>
        <Body>
            <Routes>
                {
                    paths.map(({ path, component: Component }, index) => (
                        <Route
                            key={index}
                            exact path={path}
                            element={<Component />}
                         />
                    ))
                }
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Body>
    </BrowserRouter>
);
