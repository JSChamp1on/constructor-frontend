// libs
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import { MaxWidthContent } from "@components/MaxWidth";
import { RenderBreakpoint, constants as constants_wrw } from "@components/RenderBreakpoint";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";
import { sumByClasses } from "@helpers/sumByClasses";

// styles
import styles from "./showLevel.scss";
import fontSize from "@styles/fontSize.sass";

const { SCREEN_BOARD } = constants_wrw;

export const ShowLevel = ({action_setAppLevel, action_modalsShowOneClick, app, rpc_modelCode_response}) => {
    const rpc_modelCode_response_data = { ...rpc_modelCode_response?.data };

    const navigate = useNavigate();
    const wrapperElement = useRef(null);

    const [wrapperState, setWrapperState] = useState(null);

    const handleProductLevelClick = useCallback(({code, index, link}) => {
        return () => {
            action_setAppLevel({code,index});

            if(code === 'catalog') {
                navigate(link);
            }

            if(code === 'cart') {
                action_modalsShowOneClick(true);
            }
        }
    }, [action_setAppLevel, action_modalsShowOneClick]);

    useEffect(() => {
        window.addEventListener('resize', scrollEvent, false);
        window.addEventListener('scroll', scrollEvent, false);

        return () => {
            window.removeEventListener('resize', scrollEvent, false);
            window.removeEventListener('scroll', scrollEvent, false);
        };
    }, []);

    const scrollEvent = () => {
        if (wrapperElement.current) {
            const bounding = wrapperElement.current.getBoundingClientRect();

            setWrapperState(bounding);
        }
    };

    const
        wrapperStyle = {
            height: `calc(90px + ${wrapperState?.top < -400 ? 82 : 0}px)`,
        },
        fixedStyle = {
            position: 'fixed',
            top: 0,
            left: wrapperState?.left,
            width: wrapperState?.width,
            height: wrapperState?.height,
            zIndex: 3,
        };
        
    return (
        <RenderBreakpoint
            jsx={
                <div ref={wrapperElement} className={styles.wrapper} style={wrapperStyle}>
                    <div className={styles.fullWidth} style={wrapperState?.top < 0 ? fixedStyle : null}>
                        <MaxWidthContent>
                            <div className={styles.fixed} style={{ height: 90 }}>
                                {
                                    app.levels.current.map(({code, link, name}, index) => {
                                        const isActive = app.levels.currentLevel.index >= index;
                                        const level = index + 1;

                                        return <Fragment key={name}>
                                            {
                                                index
                                                    ? <hr className={isActive ? styles.active : null} />
                                                    : null
                                            }
                                            <div className={isActive ? styles.active : null}>
                                                <span ref={(target) => target ? target.style.left = `-${target.offsetWidth / 2 - 12}px` : null} className={styles.levelName}>
                                                    { name }
                                                </span>
                                                {
                                                    <button
                                                        className={mergeClasses(styles.levelNumb, fontSize.s14)}
                                                        onClick={handleProductLevelClick({code, index, link})}
                                                        type="button"
                                                    >
                                                        { level }
                                                    </button>
                                                }
                                            </div>
                                        </Fragment>
                                    })
                                }
                            </div>
                            <>
                                {
                                    rpc_modelCode_response_data.gallery
                                    && wrapperState?.top < -400
                                    && (
                                        <div className={styles.miniSofa} style={{ height: 62 }}>
                                            <div className={styles.img}>
                                                <img 
                                                    src={rpc_modelCode_response_data.gallery[0].url} 
                                                    alt={rpc_modelCode_response_data.gallery[0].alt} 
                                                    width="106px" 
                                                />
                                            </div>
                                            <div className={styles.name}>
                                                <h3>
                                                    { rpc_modelCode_response_data.name }
                                                </h3>
                                            </div>
                                            <div className={styles.price}>
                                                <span className={mergeClasses(styles.discount, fontSize.s20)}>
                                                    { sumByClasses(rpc_modelCode_response_data.price.discountedPrice ?? rpc_modelCode_response_data.price.commonPrice) }
                                                </span>
                                                {
                                                    rpc_modelCode_response_data.price.discountedPrice
                                                    && (
                                                        <span className={mergeClasses(styles.common, fontSize.s16)}>
                                                            { sumByClasses(rpc_modelCode_response_data.price.commonPrice) }
                                                        </span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        </MaxWidthContent>
                    </div>
                </div>
            }
            rules={[[null, SCREEN_BOARD],]}
         />
    );
};
