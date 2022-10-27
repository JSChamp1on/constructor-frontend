// libs
import React from "react";

// containers
import { PreviewOfOptions } from "@containers/ProductCardSliderLevel/BookmarkLegs";

// styles
import styles from "./bookmarkLegs.scss"

export const BookmarkLegs = ({tabData}) => {
    if(!tabData) {
        return <></>;
    }

    return (
        <div className={styles.wrapper}>
            <h2>{tabData.name}</h2>
            <div className={styles.previewOfOptions}>
                {
                    tabData.list.map((data) => <PreviewOfOptions data={data} key={data.code}  />)
                }
            </div>
        </div>
    );
};
