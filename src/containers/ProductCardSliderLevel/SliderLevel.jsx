// libs
import React, { useMemo } from "react";

// app
import { constants as appConstants } from "@app";

// components
import { SlickTab } from "@components/Slider";

// containers
import { BookmarkUpholstery } from "@containers/ProductCardSliderLevel/BookmarkUpholstery";
import { BookmarkLegs } from "@containers/ProductCardSliderLevel/BookmarkLegs";
import { BookmarkAngle } from "@containers/ProductCardSliderLevel/BookmarkAngle";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./sliderLevel.scss";

const {
    TABS: {
        CODES: {
            CORNER,
            LEGS,
            UPHOLSTERY,
        }
    }
} = appConstants

const initialSlidesData = {
    componentsList: [],
    slidesIndexData: {},
};

export const SliderLevel = ({app, className, model}) => {
    const slidesData = useMemo(() => {
        if(!model) {
            return null;
        }

        return model.tabs.reduce((acc, {code}, index) => {
            let component;

            switch(code) {
                case UPHOLSTERY:
                    component = <BookmarkUpholstery key={code}  />;

                    break;
                case LEGS:
                    component = <BookmarkLegs key={code}  />;

                    break;
                case CORNER:
                    component = <BookmarkAngle key={code}  />;

                    break;
                default:
                    component = <></>;
            }

            return {
                ...acc,
                componentsList: [...acc.componentsList, component],
                slidesIndexData: {
                    ...acc.slidesIndexData,
                    [code]: index,
                }
            };
        }, initialSlidesData);
    }, [model]);

    const slideIndex = useMemo(() => {
        const {current, currentLevel} = app.levels;
        const currentAppLevelData = current[currentLevel.index];

        if(!slidesData || !currentAppLevelData) {
            return 0;
        }

        const {slidesIndexData} = slidesData;

        return slidesIndexData[currentAppLevelData.code];
    }, [app, slidesData]);

    if(!slidesData) {
        return <></>;
    }

    return (
        <div className={mergeClasses(styles.wrapper, className)}>
            <SlickTab useChange={[slideIndex, () => {}]}>
                {slidesData.componentsList}
            </SlickTab>
        </div>
    );
};
