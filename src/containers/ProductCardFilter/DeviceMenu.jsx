// libs
import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// app
import {constants as appConstants, Portal} from "@app";

// components
import { DropdownNoClose } from "@components/Dropdown";
import { ButtonMetamorphosis, ButtonSideMenu } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Radiobutton } from "@components/Radiobutton";
import { ButtonClearFilterMobile } from "@components/Button/ButtonClearFilterMobile";
import { AreaStandart, AreaSideMenu } from "@components/Area";
import { SideMenu } from "@components/SideMenu";

// helpers
import { resetFilters, setUrlFilter } from "@helpers/url";

// images
import filterSVG from "@images/filter.svg";

// styles
import styles from "./deviceMenu.scss";
import fontSize from "@styles/fontSize.sass";

const {
    QUERY: {
        FILTER
    },
} = appConstants;

export const DeviceMenu = ({filtersData, filtersList, action_resetFutureFilters, action_setFilter}) => {
    const navigate = useNavigate();
    const buttonFilterElement = useRef(null);

    // const [sortingByPriceState, setSortingByPriceState] = useState("По возрастанию цены");
    const [sideMenuState, setSideMenuState] = useState(false);

    // const onChangePrice = (e) => {
    //     setSortingByPriceState(e.target.value);
    // };

    const onChangeMultipleCheckbox = useCallback((code, id) => {
        return (e) => {
            action_setFilter({
                checked: e.target.checked,
                name: code,
                value: id,
            });
        }
    }, [action_setFilter]);

    const handleSubmit = useCallback(() => {
        const {future} = filtersData;

        const futureFiltersList = Object.entries(future).reduce((acc, [name, valuesList]) => {
            return [
                ...acc,
                {
                    name,
                    valuesList,
                }
            ];
        }, []);

        const {newUrl} = setUrlFilter({
            newFilterList: [...futureFiltersList],
            queryName: FILTER
        });

        navigate(newUrl);
    }, [filtersData])

    const handleCloseSideMenu = useCallback((value) => {
        setSideMenuState(value);
        action_resetFutureFilters();
    }, [action_resetFutureFilters])

    const handleResetFilters = useCallback(() => {
        const url = resetFilters();

        navigate(url);
    }, [])

    const getAppliedButtonsList = useCallback(({code, value}) => {
        const {future} = filtersData;
        const futureFilter = future[code];

        if(!futureFilter) {
            return [];
        }

        return value.map(({id, value}) => {
            const isActive = futureFilter.some((_id) => _id === id);

            if(!isActive) {
                return null;
            }

            return (
                <ButtonClearFilterMobile
                    key={id}
                    onClick={onChangeMultipleCheckbox(code, id)}
                    text={value}
                 />
            );
        });
    }, [filtersData, onChangeMultipleCheckbox])

    const isChecked = useCallback(({code, id}) => {
        const {future} = filtersData;
        const futureFilter = future[code];

        if(!futureFilter) {
            return false;
        }

        return futureFilter.some((_id) => _id === id);
    }, [filtersData])

    if(!filtersList || !filtersData) {
        return <></>;
    }

    return (
        <div className={styles.wrapper}>
            {/* <form onChange={onChangePrice}>
                <DropdownNoClose
                    ButtonJSX={
                        <ButtonMetamorphosis type="button">{ sortingByPriceState }</ButtonMetamorphosis>
                    }
                    AreaJSX={
                        <AreaStandart width="200px" height="">
                            <div style={{ margin: '-16px 0 -20px 0' }}>
                                <Radiobutton name="sortingByPrice" taborder="1" label="По возрастанию цены" defaultChecked/>
                                <Radiobutton name="sortingByPrice" taborder="2" label="По убыванию цены"/>
                            </div>
                        </AreaStandart>
                    }
                />
            </form> */}
            <div />
            <button
                ref={buttonFilterElement}
                type="button"
                onClick={setSideMenuState.bind(null, true)}
            >
                <img src={filterSVG} alt="" />
                <span className={fontSize.s14}>Фильтр</span>
            </button>
            <Portal>
                <SideMenu label="Фильтры" useOpen={[sideMenuState, handleCloseSideMenu]} onClick={handleSubmit}>
                    <div className={styles.wrapper__resetButtonContainer}>
                        <button
                            className={styles.wrapper__resetButton}
                            onClick={handleResetFilters}
                            type='button'
                        >Сбросить фильтры</button>
                    </div>
                    {
                        filtersList.map(({code, name, value}) => {
                            return (
                                <DropdownNoClose
                                    ButtonJSX={
                                        <ButtonSideMenu
                                            appliedFilters={getAppliedButtonsList({code, value})}
                                            type="button"
                                        >{name}</ButtonSideMenu>
                                    }
                                    AreaJSX={
                                        <AreaSideMenu width="100%">
                                            <div style={{margin: '-16px 0'}}>
                                                {
                                                    value.map(({id, value}) => {
                                                        return (
                                                            <Checkbox
                                                                checked={isChecked({code, id})}
                                                                key={value}
                                                                label={value}
                                                                onChange={onChangeMultipleCheckbox(code, id)}
                                                             />
                                                        );
                                                    })
                                                }
                                            </div>
                                        </AreaSideMenu>
                                    }
                                    key={code}
                                 />
                            );
                        })
                    }
                </SideMenu>
            </Portal>
        </div>
    );
};