// libs
import React, {useCallback, useMemo} from "react";
import { useNavigate } from "react-router-dom";

//app
import {constants as appConstants} from "@app";

// images
import closeSVG from "@images/close.svg";

// helpers
import { removeFilterValue } from "@helpers/filter";
import { resetFilters, setUrlFilter } from "@helpers/url";

// styles
import styles from "./appliedFiltersDesktop.scss";

const {
    QUERY: {
        FILTER,
    },
} = appConstants;

export const AppliedFiltersDesktop = ({tabData}) => {
    const navigate = useNavigate();

    const handleRemoveAppliedFilter = useCallback(({code, id, queryName}) => {
        return () => {
            const valuesList = removeFilterValue(queryName, code, Number(id));

            const {newUrl} = setUrlFilter({
                newFilterList: [{
                    name: code,
                    valuesList,
                }],
                queryName
            });

            navigate(newUrl);
        }
    }, [])

    const handleResetFilters = useCallback(() => {
        const url = resetFilters();

        navigate(url);
    }, [])

    const appliedFilterList = useMemo(() => {
        if(!tabData) {
            return [];
        }

        return tabData.filter.filter(({value}) => {
            return value.some(({isSelected}) => isSelected);
        });
    }, [tabData]);

    if(!appliedFilterList.length) {
        return <></>;
    }

    return (
        <div className={styles.appliedFiltersDesktop}>
            {
                appliedFilterList.map(({code, name, value}) => {
                    const selectedValues = value.filter(({isSelected}) => isSelected);

                    return selectedValues.map(({id, value}) => {
                        return (
                            <div
                                className={styles.appliedFiltersDesktop__itemContainer}
                                key={code + id}
                            >
                                <div className={styles.appliedFiltersDesktop__item}>
                                    <div className={styles.appliedFiltersDesktop__itemText}>{name}: {value}</div>
                                    <button
                                        className={styles.appliedFiltersDesktop__closeButton}
                                        onClick={handleRemoveAppliedFilter({code, id, queryName: FILTER})}
                                        type='button'
                                    >
                                        <img
                                            alt=""
                                            className={styles.appliedFiltersDesktop__closeButtonIcon}
                                            src={closeSVG}
                                         />
                                    </button>
                                </div>
                            </div>
                        );
                    });
                })
            }
            <div
                className={styles.appliedFiltersDesktop__itemContainer}
            >
                <button
                    className={styles.appliedFiltersDesktop__resetButton}
                    onClick={handleResetFilters}
                    type='button'
                >Сбросить фильтры</button>
            </div>
        </div>
    );
};
