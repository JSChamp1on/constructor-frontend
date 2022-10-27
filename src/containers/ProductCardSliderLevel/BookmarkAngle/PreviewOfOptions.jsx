// libs
import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";

//app
import {constants as appConstants} from "@app";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";
import { setUrlFilter } from "@helpers/url";

// styles
import styles from "./previewOfOptions.scss";

const {
    QUERY: {
        VALUES
    },
} = appConstants;

export const PreviewOfOptions = ({data}) => {
    const navigate = useNavigate();

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
                                    <span
                                        className={styles.img}
                                        style={{
                                            backgroundImage: `url(${image})`,
                                            backgroundSize: 'cover',
                                        }}
                                    />
                                <span className={styles.title}>{ name }</span>
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};
