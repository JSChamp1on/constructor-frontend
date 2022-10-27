// libs
import React, {useCallback, useEffect} from "react";
import { Helmet } from "react-helmet";

// app
import {constants} from "@app";

// pages
import { NotFound } from "@pages/NotFound";

// components
import { MaxWidthContent } from "@components/MaxWidth";
import { Breadcrumb } from "@components/Breadcrumb";

// containers
import { ShowLevel } from "@containers/ProductCardShowLevel";
import { Name } from "@containers/ProductCardName";
import { SliderProduct } from "@containers/ProductCardSliderProduct";
import { SliderLevel } from "@containers/ProductCardSliderLevel";
import { Transitions } from "@containers/ProductCardTransitions";
import { PurchaseIn1Click } from "@containers/ProductCardPurchaseIn1Click";

// hooks
import { useQuery } from "@hooks/useQuery";

// styles
import styles from "./productCard.scss";

// helpers
import { getUrlFilter } from "@helpers/url";

const {
    PAGES: {
        PRODUCT_CARD,
    },
    QUERY: {
        FILTER
    },
} = constants;

export const ProductCard = (readonlyProps) => {
    const {
        action_rpc_modelCode, 
        action_setAppLevel, 
        action_setAppLevels, 
        action_setAppliedFilters,
        action_modalsShowOneClick,
        app,
        isShowModal,
    } = readonlyProps;

    const instanceURLSearchParams = useQuery();

    const getData = useCallback(async () => {
        const {data} = await action_rpc_modelCode({
            query: instanceURLSearchParams.toString()
        });

        if(data) {
            const tabsList = data.tabs.map(({code, name}) => ({
                code,
                name
            }));

            action_setAppLevels(tabsList);

            const currentTabIndex = tabsList.findIndex(({code}) => code === app.levels.currentLevel.code);
            const isCurrentTabExists = currentTabIndex !== -1;

            if(isCurrentTabExists) {
                action_setAppLevel({
                    code: tabsList[currentTabIndex].code,
                    index: currentTabIndex + 1
                });
            } else {
                action_setAppLevel({
                    code: tabsList[0].code,
                    index: 1
                });
            }

            const urlFilter = getUrlFilter(FILTER);
            action_setAppliedFilters({...urlFilter});
        }
    }, [action_setAppLevel, action_setAppLevels, action_setAppliedFilters, action_rpc_modelCode, app, instanceURLSearchParams]);

    useEffect(() => {
        getData();
    }, [instanceURLSearchParams]);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    
        remoteProcedureCall();

        return () => {
            readonlyProps.action_rpc_modelCode_clear();
        };
}, []);

    const remoteProcedureCall = () => {
        if (readonlyProps.rpc_cities.done === 0) {
            readonlyProps.action_rpc_cities();
        }

        if (readonlyProps.rpc_location.done === 0) {
            readonlyProps.action_rpc_location();
        }
    };
    

    if (readonlyProps.rpc_modelCode.response?.success === false) {
        return <NotFound />;
    }

    const {selectedProduct} = readonlyProps.rpc_modelCode.response?.data ?? {};

    return <>
        <Helmet>
            <title>{PRODUCT_CARD.TITLE}</title>
        </Helmet>
        <ShowLevel />
        <MaxWidthContent>
            <Breadcrumb />
            <div className={styles.container}>
                <Name className={styles.name} />
                <SliderProduct className={styles.sliderProduct} />
                <SliderLevel className={styles.sliderLevel} />
                <Transitions className={styles.transitions} />
            </div>
        </MaxWidthContent>
        {
            selectedProduct && isShowModal
                ?
                <PurchaseIn1Click
                    selectedProduct={selectedProduct}
                    onClose={action_modalsShowOneClick}
                 />
                : null
        }
    </>;
};
