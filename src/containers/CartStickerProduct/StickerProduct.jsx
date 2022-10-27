// libs
import React from "react";

// components
import { Sticker } from "@components/Sticker";
import { CheckBlock } from "@components/CheckBlock";
import { Count } from "@components/Count";
import { Switch } from "@components/Switch";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./stickerProduct.scss";
import fontSize from "@styles/fontSize.sass";
import buttonStyles from "@styles/button";

export const StickerProduct = () => {
    return (
        <Sticker label={`Доставим ${25} октября`}>
            <div className={styles.wrapper}>
                <div className={styles.sample}>
                    <CheckBlock>
                        <div className={styles.thumbnail} />
                    </CheckBlock>
                </div>
                <div className={styles.content}>
                    <span className={styles.title}>Диван 3-местный ЧестерДиван 3-местны Диван 3-местный ЧестерДиван 3-местны</span>
                    <div className={styles.align}>
                        <span className={styles.entity}>Цвет</span>
                        <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: 4,
                            backgroundColor: '#561B25',
                        }} />
                    </div>
                    <div className={styles.align}>
                        <span className={styles.entity}>Материал</span>
                        <span className={styles.property}>Рогожка</span>
                    </div>
                    <div className={styles.align}>
                        <span className={styles.entity}>Угол</span>
                        <span className={styles.property}>Левый</span>
                    </div>
                    <Count onChange={console.log} />
                </div>
                <div className={styles.price}>
                    <span className={fontSize.s28}>145 453 ₽</span>
                    <span className={fontSize.s16}>58 000 ₽</span>
                    <div className={styles.buttons}>
                        <button type="button" className={mergeClasses(buttonStyles.text, styles.delete, fontSize.s16)}>Удалить</button>
                    </div>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.assembling}>
                <div>
                    <span className={fontSize.s16}>Сборка 1 000 ₽</span>
                </div>
                <Switch onChange={console.log} />
            </div>
        </Sticker>
    );
};
