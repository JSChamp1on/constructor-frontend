// libs
import React from "react";
import { Helmet } from "react-helmet";

// app
import { constants } from "@app";

// components
import { Checkbox } from "@components/Checkbox";
import { Sticker } from "@components/Sticker";
import { MaxWidthContent } from "@components/MaxWidth";

// containers
import { StickerProduct } from "@containers/CartStickerProduct";
import { Amount } from "@containers/CartAmount";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./cart.scss";
import fontSize from "@styles/fontSize.sass";
import buttonStyles from "@styles/button";

const {
    PAGES: {
        CART,
    }
} = constants;

export const Cart = () => {
    const addFavorite = () => {
        alert('Нажмите Ctrl-D чтобы добавить страницу в закладки'); 
    };

    return <>
        <Helmet>
            <title>{CART.TITLE}</title>
        </Helmet>
        <div className={styles.wrapper}>
            <MaxWidthContent>
                <div>
                    <div className={styles.container}>
                        <div className={styles.base}>
                            <h1>Корзина</h1>
                            <span>2 товара</span>
                            <Sticker>
                                <div className={styles.base}>
                                    <div>
                                        <Checkbox name="all" label={<span className={fontSize.s16}>Выбрать все</span>} />
                                    </div>
                                    <div>
                                        <button type="button" className={mergeClasses(buttonStyles.text, styles.favorit, fontSize.s16)} onClick={addFavorite}>
                                            В избранное
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className={mergeClasses(buttonStyles.text, styles.delete, fontSize.s16)}>
                                            Удалить все
                                        </button>
                                    </div>
                                </div>
                            </Sticker>
                        </div>
                        <div className={styles.content}>
                            <StickerProduct />
                        </div>
                        <div className={styles.totalAmount}>
                            <Amount />
                        </div>
                    </div>
                </div>
            </MaxWidthContent>
        </div>
    </>;
};
