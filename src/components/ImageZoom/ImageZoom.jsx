// lins
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// app
import { Portal } from "@app";

// styles
import styles from "./imageZoom.scss";

export const ImageZoom = (readonlyProps) => {
    const {
        children,
        fwdref,
        showPortal,
    } = readonlyProps;

    const {
        clientWidth,
        clientHeight,
    } = fwdref;

    const containerElement = useRef(null);
    const imgElementPortal = useRef(null);

    const [showPortalState, setShowPortalState] = useState(false);
    const [widthProcentState, setWidthProcentState] = useState(null);
    const [widthImgPortalState, setWidthImgPortalState] = useState(null);
    const [heightImgPortalState, setHeightImgPortalState] = useState(null);
    const [heightProcentState, setHeightProcentrState] = useState(null);
    const [leftProcentState, setLeftProcentState] = useState(null);
    const [topProcentState, setTopProcentState] = useState(null);

    useEffect(() => {
        showPortal?.(showPortalState)
    }, [showPortalState]);

    useLayoutEffect(() => {
        containerElement.current.addEventListener('mousemove', mousemove, false);
        containerElement.current.addEventListener('mouseenter', mouseenter, false);
        containerElement.current.addEventListener('mouseleave', mouseleave, false);

        return () => {
            containerElement.current.removeEventListener('mousemove', mousemove, false);
            containerElement.current.removeEventListener('mouseenter', mouseenter, false);
            containerElement.current.removeEventListener('mouseleave', mouseleave, false);
        };
    }, []);

    const
        mousemove = (e) => {
            const {
                clientWidth,
                clientHeight,
            } = fwdref;

            const containerElementBounding = containerElement.current.getBoundingClientRect();
            const imgElementPortalBounding = imgElementPortal.current.getBoundingClientRect();

            const 
                aWidth = imgElementPortalBounding.width,
                bWidth = clientWidth,
                aHeight = imgElementPortalBounding.height,
                bHeight = clientHeight;
            
            const
                widthProcent = 100 - Math.abs((bWidth - aWidth) / aWidth * 100),
                heightProcent = 100 - Math.abs((bHeight - aHeight) / aHeight * 100);
            
            setWidthProcentState(widthProcent);
            setHeightProcentrState(heightProcent);
            
            const
                x = Math.ceil(e.x - containerElementBounding.left),
                y = Math.ceil(e.y - containerElementBounding.top);

            const 
                aLeft = containerElementBounding.width,
                bLeft = x,
                aTop = containerElementBounding.height,
                bTop = y;

            const 
                leftProcent = 100 - Math.round((aLeft - bLeft) / aLeft * 100),
                topProcent = 100 - Math.round((aTop - bTop) / aTop * 100);
                
            switch (true) {
                case leftProcent < widthProcent / 2:
                    setLeftProcentState(widthProcent / 2);
                    break;
                case leftProcent + widthProcent / 2 > 100:
                    setLeftProcentState(100 - widthProcent / 2);
                    break;
                default:
                    setLeftProcentState(leftProcent);
                    break;
            }
            switch (true) {
                case topProcent < heightProcent / 2:
                    setTopProcentState(heightProcent / 2);
                    break;
                case topProcent + heightProcent / 2 > 100:
                    setTopProcentState(100 - heightProcent / 2);
                    break;
                default:
                    setTopProcentState(topProcent);
                    break;
            }

            setWidthImgPortalState(imgElementPortalBounding.width);
            setHeightImgPortalState(imgElementPortalBounding.height);
        },
        mouseenter = () => {
            setShowPortalState(true);
        },
        mouseleave = () => {
            setShowPortalState(false);
        };

    const props = {
        ...children.props,
        width: '100%',
    };
    
    return <>
        <div ref={containerElement} className={styles.container}>
            <children.type {...props} />
            {
                showPortalState
                && (
                    <div
                        className={styles.box}
                        style={{
                            top: `${topProcentState - heightProcentState / 2}%`,
                            left: `${leftProcentState - widthProcentState / 2}%`,
                            width: `${widthProcentState}%`,
                            height: `${heightProcentState}%`,
                        }}
                    />
                )
            }
        </div>
        <Portal fwdref={fwdref}>
            {
                showPortalState
                && (
                    <div 
                        className={styles.portal}
                        style={{
                            width: Number(clientWidth),
                            height: Number(clientHeight),
                        }}
                    >
                        <children.type 
                            {...{
                                ref: imgElementPortal,
                                ...children.props,
                                style: {
                                    top: `${clientHeight / 2 - heightImgPortalState / 100 * topProcentState}px`,
                                    left: `${clientWidth / 2 - widthImgPortalState / 100 * leftProcentState}px`,
                                },
                            }} 
                        />
                    </div>
                )
            }
        </Portal>
    </>;
};
