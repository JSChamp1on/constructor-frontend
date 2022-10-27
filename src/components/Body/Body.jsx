// libs
import React from "react";

// components
import { Loader } from "@components/Loader";

// containers
import { Header } from "@containers/Header";
import { Footer } from "@containers/Footer";

// styles
import styles from "./body.scss";

export const Body = (readonlyProps) => {
    return <>
        <div className={styles.wrapper}>
            <Header />
            <main>
                { readonlyProps.children }
            </main>
            <Footer />
        </div>
        <Loader />
    </>;
};