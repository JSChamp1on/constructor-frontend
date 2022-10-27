// libs
import React, { useCallback, useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";

// components
import { breakpointBool, RenderBreakpoint, constants } from "@components/RenderBreakpoint";
import { MaxWidthContent } from "@components/MaxWidth";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";
import { sumByClasses } from "@helpers/sumByClasses";

// images
import copyLinkSVG from "@images/copyLink.svg";

// styles
import styles from "./transitions.scss";
import buttonStyles from "@styles/button";
import fontSize from "@styles/fontSize.sass";

const {
    SCREEN_NOTE,
    SCREEN_BOARD,
} = constants;
const 
    UP = 'up',
    DOWN = 'down';

export const Transitions = (readonlyProps) => {
    const data_modelCode = { ...readonlyProps.rpc_modelCode_response?.data };

    const position = useRef(0);

    const [scrollDirectionState, setScrollDirectionState] = useState(UP);

    useEffect(() => {
        window.addEventListener('resize', scrollEvent, false);
        window.addEventListener('scroll', scrollEvent, false);

        return () => {
            window.removeEventListener('resize', scrollEvent, false);
            window.removeEventListener('scroll', scrollEvent, false);
        };
    }, []);

    const scrollEvent = () => {
        const body = document.body

        const extremePosition = body.scrollHeight - body.offsetHeight;
        const scrollY = window.scrollY;

        if (extremePosition >= scrollY && extremePosition < scrollY + 20) {
            setScrollDirectionState(UP);
            return null;
        }
        if (position.current > scrollY) {
            setScrollDirectionState(UP);
        }
        if (position.current < scrollY) {
            setScrollDirectionState(DOWN);
        }

        position.current = scrollY;
    };

    const navigate = useNavigate();
    const {action_modalsShowOneClick, app, page_productCard, setAppLevel} = readonlyProps;

    const handleProductLevelClick = useCallback(() => {
        action_modalsShowOneClick(true);
    }, [action_modalsShowOneClick]);

    const handleNavigationClick = useCallback((forward = true) => {
        return () => {
            const {current, currentLevel} = app.levels;
            const maxIndex = current.length - 1;
            const currentAppIndex = currentLevel.index;
            const index = forward ? currentAppIndex + 1 : currentAppIndex - 1;

            if(index <= 0) {
                setAppLevel({
                    code: current[0].code,
                    index: 0,
                });
                navigate(current[0].link);

                return;
            }

            if(index >= maxIndex) {
                setAppLevel({
                    code: current[maxIndex].code,
                    index: maxIndex,
                });

                action_modalsShowOneClick(true);

                return;
            }

            setAppLevel({
                code: current[index].code,
                index,
            });
        }
    }, [action_modalsShowOneClick, app, navigate, setAppLevel]);

    const copyUrl = () => {
        window.navigator.clipboard.writeText(window.location.href).then(() => {
            alert("copied successfully!");
        }, (e) => {
            alert('Failed to copy', e);
        });
    };

    const handleTabClick = useCallback((code, i) => {
        return () => {
            setAppLevel({
                code,
                index: i +1,
            });
        };
    }, [setAppLevel]);

    if(!page_productCard) {
        return <></>
    }

    const appLevelData = app.levels.current[app.levels.currentLevel.index];
    const isShowTabs = page_productCard.tabs.length > 1;

    const 
        amount = data_modelCode.price?.commonPrice,
        sale = data_modelCode.price?.discountedPrice;

    return <>
        <RenderBreakpoint
            jsx={
                <div className={mergeClasses(
                    styles.wrapperMobile, 
                    readonlyProps.className, 
                    breakpointBool({ rules: [[null, SCREEN_NOTE],] }) && styles.wrapperMobileFixed, 
                    breakpointBool({ rules: [[null, SCREEN_NOTE],] }) && styles[`wrapperMobileFixed_${scrollDirectionState}`]
                )}>
                    <MaxWidthContent>
                        <div>
                            <div className={styles.flex}>
                                <button
                                    className={buttonStyles.white}
                                    onClick={handleNavigationClick(false)}
                                    type="button"
                                >
                                    Назад
                                </button>
                                <button
                                    className={mergeClasses(buttonStyles.blue, styles.priceButton)}
                                    onClick={handleNavigationClick()}
                                    type="button"
                                >
                                    <div>
                                        <span>Далее</span>
                                    </div>
                                    <div>
                                        {
                                            sale
                                                ? <>
                                                    <span className={styles.bigSize}>{ sumByClasses(sale) }</span>
                                                    <span className={styles.smallSize}>{ sumByClasses(amount) }</span>
                                                </>
                                                : <>
                                                    <span className={styles.bigSize}>{ sumByClasses(amount) }</span>
                                                </>
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                    </MaxWidthContent>
                </div>
            }
            rules={[[null, SCREEN_BOARD],]}
         />
        <RenderBreakpoint
            jsx={
                <div className={readonlyProps.className}>
                    <div className={styles.wrapperDesktop}>
                        {/*<button type="button" className={mergeClasses(buttonStyles.white, styles.button, styles.copy)} onClick={copyUrl}>*/}
                        {/*    <img src={copyLinkSVG} alt="copy" />*/}
                        {/*</button>*/}
                        <button
                            className={mergeClasses(buttonStyles.white, styles.button, fontSize.s16)}
                            onClick={handleProductLevelClick}
                            type="button"
                        >Купить в 1 клик</button>
                        {/*<button type="button" className={buttonStyles.blue}>В корзину</button>*/}
                    </div>
                    <div className={mergeClasses(styles.tabs, !isShowTabs ? styles.tabs_empty : '')}>
                        {
                            isShowTabs
                                ?
                                    page_productCard.tabs.map(({code, name}, i) => {
                                        return (
                                            <button
                                                type="button"
                                                className={appLevelData?.code === code ? styles.active : ''}
                                                key={code}
                                                onClick={handleTabClick(code, i)}
                                            >
                                                {name}
                                            </button>
                                        );
                                    })
                                :
                                null
                        }
                    </div>
                </div>
            }
            rules={[[SCREEN_BOARD, null],]}
         />
    </>;
};
