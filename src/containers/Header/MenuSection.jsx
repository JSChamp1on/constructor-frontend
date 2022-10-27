// libs
import React from "react";

// components
import { Link } from "@components/Link";
import { MaxWidthContent } from "@components/MaxWidth";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./menuSection.scss";
import fontSize from "@styles/fontSize.sass";

export const MenuSection = () => {
    return (
        <div className={styles.wrapper}>
            <MaxWidthContent>
                <div>
                    <nav className={mergeClasses(styles.list, fontSize.s18)}>
                        <Link href="https://lazurit.com/discounts/" className={styles.sale}>% Акции</Link>
                        <Link href="https://lazurit.com/catalog/krovati-i-matrasy/">Все товары</Link>
                        <Link href="https://lazurit.com/rooms/myagkaya_mebel/">Мягкая мебель</Link>
                        <Link href="https://lazurit.com/rooms/bedroom/">Спальня</Link>
                        <Link href="https://lazurit.com/rooms/living-room/">Гостиная</Link>
                        <Link href="https://lazurit.com/rooms/hallway/">Прихожая</Link>
                        <Link href="https://lazurit.com/rooms/nursery/">Детская</Link>
                        <Link href="https://lazurit.com/rooms/cabinet/">Кабинет</Link>
                        <Link href="https://lazurit.com/rooms/stoly_stylia/">Столы и стулья</Link>
                        <Link href="https://lazurit.com/collections/kitchen/">Кухня</Link>
                    </nav>
                </div>
            </MaxWidthContent>
        </div>
    );
};
