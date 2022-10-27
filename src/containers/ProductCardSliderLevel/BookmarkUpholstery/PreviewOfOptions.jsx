// libs
import React, { useCallback, useEffect } from "react";
import {useNavigate} from "react-router-dom";

//app
import {constants as appConstants} from "@app";

// components
import { DropdownNoClose } from "@components/Dropdown";
import { ButtonList } from "@components/Button";
import { SwiperAuto } from "@components/Slider";
import { AreaList } from "@components/Area";
import { RenderBreakpoint, constants } from "@components/RenderBreakpoint";
import { Tooltip, tooltipUnmount } from "@components/Tooltip";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";
import { sumByClasses } from "@helpers/sumByClasses";
import { setUrlFilter } from "@helpers/url";

// styles
import styles from "./previewOfOptions.scss";
import fontSize from "@styles/fontSize.sass";

const {
    SCREEN_NOTE,
    SCREEN_BOARD,
    SCREEN_UXGA,
} = constants;

const {
    QUERY: {
        VALUES
    },
} = appConstants;

export const PreviewOfOptions = (readonlyProps) => {
    const {
        data,
    } = readonlyProps;

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            tooltipUnmount();
        };
    }, []);

    const setFilter = useCallback((code, id) => {
        return (e) => {
            const {newUrl} = setUrlFilter({
                newFilterList: [{
                    name: code,
                    valuesList: [Number(id)],
                }],
                queryName: VALUES,
            });

            navigate(newUrl);
        };
    }, [])

    const 
        amount = sumByClasses(data?.prices?.commonPrice),
        sale = sumByClasses(data?.prices?.discountedPrice);

    return (
        <div className={styles.wrapper}>
            <div className={styles.material}>
                {
                    data?.benefits?.map((item, index) => {
                        return (
                            <div key={index} className={styles.frame}>
                                <img src={item.image} alt={item.value} />
                            </div>
                        );
                    })
                }
                <DropdownNoClose
                    ButtonJSX={<ButtonList type="button">{ data.name }</ButtonList>}
                    AreaJSX={
                        <AreaList>
                            <span className={fontSize.s18}>{ sale ?? amount } &nbsp;</span>
                            {
                                sale
                                && (
                                    <span className={mergeClasses(styles.greyOldPrice, fontSize.s16)}>{ amount }</span>
                                )
                            }
                            <br />
                            {
                                data?.properties?.map((item, index,) => (
                                    <span key={index} className={mergeClasses(styles.pre, styles.grey, fontSize.s16)}>{item.name}: {item.value}</span>
                                ))
                            }
                        </AreaList>
                    }
                 />
            </div>
            <div className={styles.materialSamples}>
                <RenderBreakpoint
                    jsx={
                        <div className={styles.flexNowrap}>
                            <SwiperAuto>
                                {
                                    data?.values?.map((item, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className={styles.item}
                                                onClick={setFilter(data.code, item.id)}
                                                disabled={!item.isActive}
                                            >
                                                <Tooltip 
                                                    tipJSX={
                                                        <div className={styles.tooltip}>
                                                            <div className={styles.img}>
                                                                <img src={item.image} alt={item.description} />
                                                            </div>
                                                            <div className={styles.description}>
                                                                <span className={fontSize.s12}>
                                                                    { item.description }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    }
                                                >
                                                    <span
                                                        className={mergeClasses(styles.img, item.isSelected && styles.isSelected)}
                                                        style={{
                                                            backgroundImage: `url(${item.image})`,
                                                            backgroundSize: 'cover',
                                                            filter: item.isActive ? 'unset' : 'grayscale(100%)',
                                                            opacity: item.isActive ? 1 : .5,
                                                        }}
                                                    />
                                                </Tooltip>
                                                <span 
                                                    className={mergeClasses(styles.marginTop, fontSize.s14)}
                                                    style={{
                                                        textDecoration: item.isActive ? 'none' : 'line-through',
                                                    }}
                                                >
                                                    { item.name }
                                                </span>
                                            </button>
                                        );
                                    })
                                }
                            </SwiperAuto>
                        </div>
                    }
                    rules={[[null, SCREEN_NOTE], [SCREEN_BOARD, SCREEN_UXGA],]}
                 />
                <RenderBreakpoint
                    jsx={
                        <div className={styles.flexWrap}>
                            {
                                data?.values?.map((item) => {
                                    
                                    return (
                                        <button
                                            key={item.name}
                                            className={styles.item}
                                            onClick={setFilter(data.code, item.id)}
                                            disabled={!item.isActive}
                                        >
                                            <Tooltip 
                                                tipJSX={
                                                    <div className={styles.tooltip}>
                                                        <div className={styles.img}>
                                                            <img src={item.image} alt={item.description} />
                                                        </div>
                                                        <div className={styles.description}>
                                                            <span className={fontSize.s12}>
                                                                { item.description }
                                                            </span>
                                                        </div>
                                                    </div>
                                                }
                                            >
                                                <span
                                                    className={mergeClasses(styles.img, item.isSelected && styles.isSelected)}
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                        backgroundSize: 'cover',
                                                        filter: item.isActive ? 'unset' : 'grayscale(100%)',
                                                        opacity: item.isActive ? 1 : .5,
                                                    }}
                                                />
                                            </Tooltip>
                                            <span 
                                                className={mergeClasses(styles.marginTop, fontSize.s16)}
                                                style={{
                                                    textDecoration: item.isActive ? 'none' : 'line-through',
                                                }}
                                            >
                                                { item.name }
                                            </span>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    }
                    rules={[[SCREEN_NOTE, SCREEN_BOARD], [SCREEN_UXGA, null],]}
                 />
            </div>
        </div>
    )
};
