// libs
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

// app
import { constants } from "@app";

// components
import { MaxWidthContent } from "@components/MaxWidth";

// containers
import { Filter } from "@containers/HomepageFilter";
import { Icons } from "@containers/HomepageIcons";
import { Tiles } from "@containers/HomepageTiles";

// styles
import fontSize from "@styles/fontSize.sass";

const {
    PAGES: {
        HOMEPAGE,
    }
} = constants;

export const Homepage = (readonlyProps) => {
    useEffect(() => {
        remoteProcedureCall();
    }, []);

    const remoteProcedureCall = () => {
        if (readonlyProps.rpc_cities.done === 0) {
            readonlyProps.action_rpc_cities();
        }
        
        if (readonlyProps.rpc_filter.done === 0) {
            readonlyProps.action_rpc_filter();
        }

        if (readonlyProps.rpc_location.done === 0) {
            readonlyProps.action_rpc_location();
        }

        if (readonlyProps.rpc_models.done === 0) {
            readonlyProps.action_rpc_models();
        }

        if (readonlyProps.rpc_sort.done === 0) {
            readonlyProps.action_rpc_sort();
        }
    };
    
    return <>
        <Helmet>
            <title>{HOMEPAGE.TITLE}</title>
        </Helmet>
        <MaxWidthContent>
            <h1>Конструктор диванов</h1>
            <p className={fontSize.s16} style={{ marginBottom: 32 }}>Соберите идеальный диван, выбирая параметры подходящие именно Вам.</p>
            <h2>Выберите модель</h2>
            <Icons />
            <Filter />
            <Tiles />
        </MaxWidthContent>
    </>;
};
