// libs
import React, { Fragment } from "react";

// app
import { constants as constants_app } from "@app";

// components
import { SlickGallery } from "@components/Slider";
import { Link } from "@components/Link";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";
import { sumByClasses } from "@helpers/sumByClasses";

// styles
import styles from "./card.scss";
import fontSize from "@styles/fontSize.sass";
import buttonStyles from "@styles/button";
import { useNavigate } from "react-router";

const {
    PAGES: {
        PRODUCT_CARD,
    }
} = constants_app;

export const Card = (readonlyProps) => {
    const dataItem = { ...readonlyProps.data };

    const navigate = useNavigate();

    const hrefLink = () => {
        const path = PRODUCT_CARD.PATH.replace(/\/:.+$/, '');

        const url = new URL(path, window.location.origin);
        url.pathname += `/${encodeURIComponent(dataItem.code)}`;
        url.searchParams.set('article', dataItem.article);

        return url.pathname + url.search;
    };

    const goToProductcard = () => {
        navigate(hrefLink())
    };

    const 
        amount = sumByClasses(dataItem.prices?.commonPrice),
        sale = sumByClasses(dataItem.prices?.discountedPrice);
    
    return (
        <div className={styles.wrapper}>
            <div onClick={goToProductcard}>
                <SlickGallery mouseEvent>
                    {
                        dataItem.gallery?.map((item, index) => {
                            return <img key={index} src={item} alt="" className={styles.cursorPointer} width="100%" />;
                        })
                    }
                </SlickGallery>
                <span className={mergeClasses(styles.heading, fontSize.s16)}>{ dataItem.name }</span>
                <div className={styles.margins}>
                    {
                        sale
                            ? <>
                                <span className={mergeClasses(styles.amountMargin, styles.amountRed, fontSize.s24)}>от { sale }&nbsp;</span>
                                <span className={mergeClasses(styles.saleGrey, fontSize.s16)}>от { amount }</span>
                            </>
                            : <>
                                <span className={mergeClasses(styles.amountMargin, fontSize.s24)}>от { amount }</span>
                            </>
                    }
                </div>
                {
                    dataItem.properties.map((item, index) => {
                        return <Fragment key={index}>
                            <span className={mergeClasses(styles.grey, fontSize.s16)}>{ item.name }: </span>
                            <span className={mergeClasses(styles.darkGrey, fontSize.s16)}>{ item.value[0] }</span>
                        </Fragment>;
                    })
                }
            </div>
            <div>
                <Link href={hrefLink()} className={mergeClasses(buttonStyles.blue, fontSize.s16, styles.button)}>Выбрать</Link>
            </div>
        </div>
    );
};
