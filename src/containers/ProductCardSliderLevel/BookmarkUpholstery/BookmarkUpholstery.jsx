// libs
import React, { Fragment } from "react";

// app
import { constants as appConstants } from "@app";

// containers
import { Filter } from "@containers/ProductCardFilter";
import { PreviewOfOptions } from "@containers/ProductCardSliderLevel/BookmarkUpholstery";
import { AppliedFiltersDesktop } from "@containers/ProductCardAppliedFilterDesktop/AppliedFiltersDesktop";
import { constants, RenderBreakpoint } from "@components/RenderBreakpoint";

// styles
import styles from "./bookmarkUpholstery.scss";

const {
    SCREEN_NOTE,
} = constants;

const {
    TABS: {
        CODES: {
            UPHOLSTERY
        }
    }
} = appConstants;

export const BookmarkUpholstery = (readonlyProps) => {
    const rpc_modelCode_response = { ...readonlyProps.rpc_modelCode.response };
    const data_rpc_modelCode = { ...rpc_modelCode_response?.data };
    
    const upholstery = { ...data_rpc_modelCode.tabs?.find(({ code }) => code === UPHOLSTERY) };
    const upholsteryList = upholstery.list ?? [];

    return (
        <div className={styles.wrapper}>
            <Filter filtersList={readonlyProps.upholsteryTabData?.filter} />
            <RenderBreakpoint
                jsx={
                    <div className={styles.wrapper__appliedFiltersBlock}>
                        <AppliedFiltersDesktop tabData={readonlyProps.upholsteryTabData}  />
                    </div>
                }
                rules={[[SCREEN_NOTE, null],]}
             />
            <div className={styles.previewOfOptions}>
                {
                    upholsteryList.map((item, index) => {
                        return <Fragment key={index}>
                            <PreviewOfOptions data={item} action_rpc_modelCode={readonlyProps.action_rpc_modelCode} />
                        </Fragment>;
                    })
                }
            </div>
        </div>
    );
};
