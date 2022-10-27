// libs
import React from "react";

// components
import { TopSection, MenuSection } from "@containers/Header";

// styles
import styles from "./header.scss";

export const Header = () => {
    return (
        <header className={styles.wrapper}>
            <TopSection />
            <MenuSection />
        </header>
    );
};
