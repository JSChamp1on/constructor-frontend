// libs
import React from "react";

// components
import { Link } from "@components/Link";

// images
import arrowSVG from "@images/arrow.svg";

// styles
import styles from "./breadcrumb.scss";

export const Breadcrumb = () => {
    return (
        <ul className={styles.wrapper}>
            <li>
                <img src={arrowSVG} className={styles.arrow} alt="" />
                <Link href="/">Вернуться к выбору модели</Link>
            </li>
        </ul>
    );
};
