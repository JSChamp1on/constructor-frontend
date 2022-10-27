// libs
import React from "react";

// components
import { DropdownClickClose } from "@components/Dropdown";
import { RenderBreakpoint, constants } from "@components/RenderBreakpoint";
import { AreaStandart } from "@components/Area";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";
import { sumByClasses } from "@helpers/sumByClasses";

// images
import threeDotsSVG from "@images/threeDots.svg";

// styles
import styles from "./name.scss";
import fontSize from "@styles/fontSize.sass";
import buttonStyles from "@styles/button";

const {
    SCREEN_BOARD,
} = constants;

export const Name = (readonlyProps) => {
    const {
        className,
    } = readonlyProps;

    const rpc_modelCode_response = { ...readonlyProps.rpc_modelCode.response };
    const data_modelCode = { ...rpc_modelCode_response?.data };

    const 
        amount = data_modelCode.price?.commonPrice,
        sale = data_modelCode.price?.discountedPrice,
        discount = (
            typeof amount === 'number'
            && typeof sale === 'number'
                ? 100 - Math.round(100 / (amount / sale))
                : null
        );

    const copyUrl = () => {
        window.navigator.clipboard.writeText(window.location.href).then(() => {
            alert("copied successfully!");
        }, (e) => {
            alert('Failed to copy', e);
        });
    };

    return <>
        <RenderBreakpoint
            jsx={
                <div className={mergeClasses(styles.wrapper, className)}>
                    <h1>{ data_modelCode.name }</h1>
                    {/*<DropdownClickClose*/}
                    {/*    ButtonJSX={*/}
                    {/*        <button type="button" className={mergeClasses(buttonStyles.white, styles.button)}>*/}
                    {/*            <img src={threeDotsSVG} alt="menu" />*/}
                    {/*        </button>*/}
                    {/*    }*/}
                    {/*    AreaJSX={*/}
                    {/*        <AreaStandart>*/}
                    {/*            <button type="button" className={buttonStyles.text} onClick={copyUrl}>Копировать ссылку</button>*/}
                    {/*        </AreaStandart>*/}
                    {/*    }*/}
                    {/*/>*/}
                </div>
            } 
            rules={[[null, SCREEN_BOARD],]}
         />
        <RenderBreakpoint
            jsx={
                <div className={mergeClasses(styles.wrapper, className)}>
                    <h1>{ data_modelCode.name }</h1>
                    <div className={styles.price}>
                        {
                            sale
                                ? <>
                                    <span className={mergeClasses(fontSize.s36, styles.lineHeight)}>{ sumByClasses(sale) }</span>
                                    <span className={fontSize.s18}>{ sumByClasses(amount) }</span>
                                </>
                                : <>
                                    <span className={mergeClasses(fontSize.s36, styles.lineHeight)}>{ sumByClasses(amount) }</span>
                                </>
                        }
                        {
                            sale
                            && (
                                <span className={fontSize.s18}>{ discount }% скидка</span>
                            )
                        }
                    </div>
                </div>
            } 
            rules={[[SCREEN_BOARD, null],]}
         />
    </>;
}
