// libs
import React from "react";

// images
import infoSvg from "@images/info.svg";

// containers
import { PreviewOfOptions } from "@containers/ProductCardSliderLevel/BookmarkAngle";

// styles
import styles from "./bookmarkAngle.scss"

export const BookmarkAngle = ({tabData}) => {
    if(!tabData) {
        return <></>;
    }

    const {description, list, name} = tabData;

    return (
        <div className={styles.wrapper}>
            <h2>{name}</h2>
            {
                description
                    ?
                    <div className={styles.wrapper__descriptionBlock}>
                        <img
                            alt=""
                            className={styles.wrapper__descriptionIcon}
                            src={infoSvg}
                         />
                        <span className={styles.wrapper__descriptionText}>{description}</span>
                    </div>
                    : <></>
            }
            <div className={styles.previewOfOptions}>
                {
                    list.map((data) => <PreviewOfOptions data={data} key={data.code}  />)
                }
            </div>
        </div>
    );
};
