// libs
import React, { Fragment, useEffect, useRef, useState } from "react";

// components
import { RenderBreakpoint, breakpointBool, constants } from "@components/RenderBreakpoint";
import { SlickGallery } from "@components/Slider";
import { ImageZoom } from "@components/ImageZoom";
import { Panel } from "@components/Panel";
import { Tooltip, tooltipUnmount } from "@components/Tooltip";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";
import { uniqueId } from "@helpers/uniqueId";

// styles
import styles from "./sliderProduct.scss";
import fontSize from "@styles/fontSize.sass";

// images
import iSVG from "@images/i.svg";

const {
    SCREEN_NOTE,
    SCREEN_BOARD,
} = constants;

export const SliderProduct = (readonlyProps) => {
    const rpc_modelCode_response = { ...readonlyProps.rpc_modelCode?.response };
    const data_modelCode = { ...rpc_modelCode_response?.data };

    const wrapperElement = useRef(null);
    const fixedElement = useRef(null);
    const previewZoomId = useRef(uniqueId.generate);

    const [openMobilePanelState, setOpenMobilePanelState] = useState(false);
    const [positionState, setPositionState] = useState({ position: 'absolute', top: 0 });
    const [showPortalState, setShowPortalState] = useState(false);
    const [minHeightState, setHeightState] = useState(0);

    useEffect(() => {
        wrapperScroll();
        
        window.addEventListener('scroll', wrapperScroll, false);
        window.addEventListener('resize', wrapperScroll, false);

        return () => {
            window.removeEventListener('scroll', wrapperScroll, false);
            window.removeEventListener('resize', wrapperScroll, false);

            tooltipUnmount();
        };
    }, []);

    const wrapperScroll = () => {
        const {
            top,
            left,
            width,
            height,
        } = wrapperElement.current.getBoundingClientRect();
        const fixedElementHeight = fixedElement.current.getBoundingClientRect().height;
        
        setHeightState(fixedElementHeight);

        if (!breakpointBool({ rules: [[SCREEN_BOARD, null],] })) {
            setPositionState({});

            return null;
        }

        if (top <= 0) {
            if (Math.abs(top) >= height - fixedElementHeight) {
                setPositionState({ position: 'absolute', bottom: 0, zIndex: 1 });

                return null;
            }
            
            setPositionState({ position: 'fixed', top: 0, left, width, zIndex: 1 });

            return null;
        }
        
        setPositionState({ position: 'relative', top: 0, zIndex: 1 });
    };

    return (
        <div ref={wrapperElement} className={mergeClasses(styles.wrapper, readonlyProps.className)} style={{ minHeight: minHeightState }}>
            <div 
                ref={fixedElement}
                className={styles.fixed} 
                style={{
                    left: 0,
                    right: 0,
                    ...positionState
                }}
            >
                <SlickGallery 
                    paging={
                        data_modelCode.gallery?.map((item, index) => (
                            <img key={index} src={item.url} alt={item.alt} />
                        ))
                    }
                    dotsPreview
                >
                    {
                        data_modelCode.gallery?.map((item, index) => (
                            <Fragment key={index}>
                                <RenderBreakpoint
                                    jsx={
                                        <img src={item.url} alt={item.alt} style={{ width: '100%' }} />
                                    } 
                                    rules={[[null, SCREEN_NOTE],]}
                                />
                                <RenderBreakpoint
                                    jsx={
                                        <ImageZoom width="400" height="400" fwdref={document.querySelector(`#${previewZoomId.current}`)} showPortal={(bool) => setShowPortalState(bool)}>
                                            <img src={item.url} alt={item.alt} />
                                        </ImageZoom>
                                    } 
                                    rules={[[SCREEN_NOTE, null],]}
                                />
                            </Fragment>
                        ))
                    }
                </SlickGallery>
                <div className={styles.characteristics}>
                    <RenderBreakpoint
                        jsx={<>
                            <span 
                                className={mergeClasses(styles.descriptionButton, fontSize.s14)} 
                                onClick={() => setOpenMobilePanelState(!openMobilePanelState)}
                            >
                                Характеристики модели
                            </span>
                        </>} 
                        rules={[[null, SCREEN_NOTE],]}
                    />
                    <Panel useOpen={[openMobilePanelState, setOpenMobilePanelState]}>
                        <div className={styles.descriptionPanel}>
                            <span className={fontSize.s20}>Характеристики модели</span>
                            <ul>
                                {
                                    data_modelCode.parameters?.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <span className={fontSize.s14}>{ item.name }: { item.value }</span>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </Panel>
                    <RenderBreakpoint
                        jsx={<>
                            <span className={mergeClasses(styles.label, fontSize.s24)}>Параметры модели</span>
                            <div className={styles.flex}>
                                {
                                    data_modelCode.parameters?.map((item, index) => {
                                        return <Fragment key={index}>
                                            <span className={styles.label}>{ item.name }:</span>
                                            <span className={styles.param}>
                                                { item.value }
                                                {
                                                    item.description
                                                    && <>
                                                        &nbsp;
                                                        <Tooltip
                                                            tipJSX={
                                                                <div className={styles.tooltip}>
                                                                    <img src={item.description.gif} alt="" width="100%" />
                                                                </div>
                                                            }
                                                        >
                                                            <img src={iSVG} alt={item.alt} style={{ position: 'relative', top: 4 }} />
                                                        </Tooltip>
                                                    </>
                                                }
                                            </span>
                                        </Fragment>;
                                    })
                                }
                            </div>
                        </>} 
                        rules={[[SCREEN_NOTE, null],]}
                    />
                </div>
                <div id={previewZoomId.current} className={styles.previewZoom} style={showPortalState ? {} : { width: 0, height: 0 }} />
            </div>
        </div>
    );
};
