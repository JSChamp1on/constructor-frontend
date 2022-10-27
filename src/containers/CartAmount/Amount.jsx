// libs
import React from "react";

// components
import { Sticker } from "@components/Sticker";

// images
import promocodeSVG from "@images/promocode.svg";

// styles
import styles from "./amount.scss";
import fontSize from "@styles/fontSize.sass";
import buttonStyles from "@styles/button";

export const Amount = () => {
    return (
        <Sticker label="Сумма по корзине">
            <div className={styles.wrapper}>
                <div className={styles.list}>
                    <div>
                        <span className={fontSize.s16}>2 товара</span>
                    </div>
                    <div>
                        <span className={fontSize.s16}>60 985 ₽</span>
                    </div>
                    <div>
                        <span className={fontSize.s16}>Сборка</span>
                    </div>
                    <div>
                        <span className={fontSize.s16}>1 000 ₽ </span>
                    </div>
                    <div>
                        <span className={fontSize.s16}>Доставка по г.: Санкт-Петербург</span>
                    </div>
                    <div>
                        <span className={fontSize.s16}> от 1000 ₽</span>
                    </div>
                    <div>
                        <span className={fontSize.s16}>Скидка</span>
                    </div>
                    <div>
                        <span className={fontSize.s16}>− 30 985 ₽</span>
                    </div>
                </div>

                <hr />
                <div className={styles.price}>
                    <span className={fontSize.s18}>Итого:</span>
                    <span className={fontSize.s36}>30 985 ₽</span>
                </div>
                <button type="button" className={buttonStyles.blue} width="100%">Перейти к оформлению</button>
                <div className={styles.info}>
                    <img src={promocodeSVG} alt="" />
                    <span className={fontSize.s14}>Применить промокод и узнать точную стоимость доставки можно при оформлении заказа</span>
                </div>
            </div>
        </Sticker>
    );
};