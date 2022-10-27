// libs
import React from "react";

// components
import { MenuSection, CopyrightSection, MobileBar } from "@containers/Footer";

// styles
import styles from "./footer.scss";

export const Footer = () => {
    return (
        <footer className={styles.wrapper}>
            <MenuSection />
            <CopyrightSection />
            <MobileBar />
        </footer>
    );
};