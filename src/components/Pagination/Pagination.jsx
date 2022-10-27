// libs
import React, { useEffect, useState } from "react";

// components
import { breakpointBool, constants } from "@components/RenderBreakpoint";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles 
import styles from "./pagination.scss";
import fontSize from "@styles/fontSize.sass";

const {
    SCREEN_MOBILE,
    SCREEN_NOTE,
    SCREEN_PAD,
    SCREEN_BOARD,
    SCREEN_UXGA,
    SCREEN_FHD,
} = constants;

const arrowSvg = (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="42" height="42" rx="21" strokeWidth="0" fill="white"/>
        <path d="M21.834 18.8437L18.1125 22.4167L21.834 25.9896L20.6947 27.0833L15.834 22.4167L20.6947 17.75L21.834 18.8437Z" fill="#858585"/>
        <path d="M17.166 22.418H29.166" stroke="#858585" strokeWidth="2"/>
        <rect x="1" y="1" width="42" height="42" rx="21" stroke="#C4C4C4" strokeWidth="2"/>
    </svg>
);

export const Pagination = (readonlyProps) => {
    const {
        totalCount = Number(),
        displayedCount = Number(),
        useChange = useState(0),
    } = readonlyProps;

    if (totalCount <= displayedCount) {
        return null;
    }

    const [pageIndexState, setPageIndexState] = useChange;

    const [maxRenderItemLimitState, setMaxRenderItemLimitState] = useState(Number());
    
    const pagesCountCail = Math.ceil(totalCount / displayedCount);
    const pagesCount = pagesCountCail !== Infinity ? pagesCountCail : 0;

    const 
        enableArrowPrev = pageIndexState > 0,
        enableArrowNext = pagesCount > pageIndexState +1;
    
    useEffect(() => {
        maxRenderItemLimit();

        window.addEventListener('resize', maxRenderItemLimit, false);
        window.addEventListener('popstate', popstateHistory, false);

        return () => {
            window.removeEventListener('resize', maxRenderItemLimit, false);
            window.removeEventListener('popstate', popstateHistory, false);
        };
    }, []);

    const maxRenderItemLimit = () => {
        switch (true) {
            case breakpointBool({ rules: [[null, SCREEN_MOBILE],] }):
                setMaxRenderItemLimitState(5);
                break;

            case breakpointBool({ rules: [[SCREEN_MOBILE, SCREEN_NOTE],] }):
                setMaxRenderItemLimitState(7);
                break;

            case breakpointBool({ rules: [[SCREEN_NOTE, SCREEN_PAD],] }):
                setMaxRenderItemLimitState(9);
                break;

            case breakpointBool({ rules: [[SCREEN_PAD, SCREEN_BOARD],] }):
                setMaxRenderItemLimitState(11);
                break;

            case breakpointBool({ rules: [[SCREEN_BOARD, SCREEN_UXGA],] }):
                setMaxRenderItemLimitState(13);
                break;

            case breakpointBool({ rules: [[SCREEN_UXGA, SCREEN_FHD],] }):
                setMaxRenderItemLimitState(15);
                break;

            case breakpointBool({ rules: [[SCREEN_FHD, null],] }):
                setMaxRenderItemLimitState(17);
                break;
        }
    };

    const popstateHistory = () => {
        const searchParams = new URLSearchParams(location.search);

        if (searchParams.has('page')) {
            const pageNum = Number(searchParams.get('page'));
            const pageIndex = pageNum -1;
            setPageIndexState(pageIndex);
        } else {
            setPageIndexState(0);
        }
    };

    const pushHistory = (index) => {
        const url = new URL(window.location);
        url.searchParams.set('page', index +1);
        window.history.pushState({}, '', url);
    };

    const 
        onClickArrowPrev = () => {
            if (enableArrowPrev) {
                pushHistory(pageIndexState -1);
                setPageIndexState(pageIndexState -1);
            }
        },
        onClickArrowNext = () => {
            if (enableArrowNext) {
                pushHistory(pageIndexState +1)
                setPageIndexState(pageIndexState +1);
            }
        },
        onClickPages = (e) => {
            const index = Number(e.target.dataset.index);

            pushHistory(index);
            setPageIndexState(index);
        };

    return (
        <div className={styles.wrapper}>
            <button 
                type="button" 
                className={mergeClasses(styles.arrows, styles.prev)} 
                onClick={onClickArrowPrev}
                disabled={!enableArrowPrev}
                aria-label="Prev"
            >
                { arrowSvg }
            </button>
            <button 
                type="button" 
                className={mergeClasses(styles.arrows, styles.next)} 
                onClick={onClickArrowNext}
                disabled={!enableArrowNext}
                aria-label="Next"
            >
                { arrowSvg }
            </button>
            <ul className={styles.pages}>
                {
                    new Array(pagesCount).fill(<button />).map((element, index, array) => {
                        let 
                            classes = [
                                styles.btn,
                                fontSize.s14,
                            ],
                            disabled = false;

                        if (index === pageIndexState) {
                            classes.push(styles.active);
                            disabled = true;
                        }

                        const props = {
                            type: 'button',
                            className: mergeClasses(...classes),
                            ['data-index']: index,
                            disabled,
                            onClick: onClickPages,
                            children: index +1,
                        };
                        
                        const 
                            incrementLimit = Math.floor(maxRenderItemLimitState / 2),
                            decrementLimit = Math.ceil(maxRenderItemLimitState / 2);

                        if (
                            (
                                pageIndexState - decrementLimit < index 
                                || array.length - maxRenderItemLimitState <= index
                            )
                            && (
                                pageIndexState + incrementLimit >= index 
                                || maxRenderItemLimitState > index
                            )
                        ) {
                            return (
                                <li key={index}>
                                    {{ ...element, props }}
                                </li>
                            );
                        }

                        return null;
                    })
                }
            </ul>
        </div>
    );
};
