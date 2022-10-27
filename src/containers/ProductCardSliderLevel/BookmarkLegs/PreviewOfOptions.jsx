// libs
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//app
import {constants as appConstants} from "@app";

// components
import { Tooltip, tooltipUnmount } from "@components/Tooltip";

// helpers
import { setUrlFilter } from "@helpers/url";
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./previewOfOptions.scss";

const {
    QUERY: {
        VALUES
    },
} = appConstants;

export const PreviewOfOptions = ({data}) => {
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            tooltipUnmount();
        };
    }, []);

    const setFilter = useCallback((code, id) => {
        return (e) => {
            const {newUrl} = setUrlFilter({
                newFilterList: [{
                    name: code,
                    valuesList: [id],
                }],
                queryName: VALUES,
            });

            navigate(newUrl);
        };
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.materialSamples}>
                <div className={styles.dragging}>
                    {
                        data.values.map(({id, image, isSelected, name}) => (
                            <button
                                className={mergeClasses(styles.item, isSelected && styles.isSelected)}
                                key={id}
                                onClick={setFilter(data.code, id)}
                            >
                                <Tooltip 
                                    tipJSX={
                                        <div className={styles.tooltip}>
                                            <div className={styles.img}>
                                                <img src={item.image} alt={item.description} />
                                            </div>
                                            <div className={styles.description}>
                                                <span className={fontSize.s12}>
                                                    { item.description }
                                                </span>
                                            </div>
                                        </div>
                                    }
                                >
                                    <span
                                        className={styles.img}
                                        style={{
                                            backgroundImage: `url(${image})`,
                                            backgroundSize: 'cover',
                                        }}
                                    />
                                </Tooltip>
                                <span className={styles.title}>{ name }</span>
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};
