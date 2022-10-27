// libs
import React, {useCallback} from "react";
import { useNavigate } from "react-router-dom";

//app
import {constants as appConstants} from "@app";

// components
import { DropdownClickClose } from "@components/Dropdown";
import { ButtonMetamorphosis } from "@components/Button";
import { AreaStandart } from "@components/Area";
import { Checkbox } from "@components/Checkbox";

// helpers
import { addFilterValue, removeFilterValue } from "@helpers/filter";
import { setUrlFilter } from "@helpers/url";

// styles
import styles from "./desktopMenu.scss";

const {
    QUERY: {
        FILTER,
    },
} = appConstants;

export const DesktopMenu = ({filtersList}) => {
    const navigate = useNavigate();

    const onChange = useCallback((code, id) => {
        return (e) => {
            let valuesList;

            if(e.target.checked) {
                valuesList = addFilterValue(FILTER, code, id);
            } else {
                valuesList = removeFilterValue(FILTER, code, id);
            }

            const {newUrl} = setUrlFilter({
                newFilterList: [{
                    name: code,
                    valuesList,
                }],
                queryName: FILTER
            });

            navigate(newUrl);
        }
    }, []);

    if(!filtersList) {
        return <></>;
    }

    return (
        <div className={styles.wrapper}>
            {
                filtersList.map(({code, name, value}) => {
                    const sortValue = value.sort((a, b) => {
                        if (a.value < b.value) return -1;
                        if (a.value > b.value) return 1;
                        return 0;
                    });

                    return (
                        <DropdownClickClose
                            ButtonJSX={
                                <ButtonMetamorphosis type="button">{name}</ButtonMetamorphosis>
                            }
                            AreaJSX={
                                <AreaStandart width="260px" height="162px">
                                    <div style={{margin: '-16px 0'}}>
                                        {
                                            sortValue.map(({id, isSelected, value}) => {
                                                return (
                                                    <Checkbox
                                                        checked={isSelected}
                                                        key={value}
                                                        label={value}
                                                        onChange={onChange(code, id)}
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                </AreaStandart>
                            }
                            key={code}
                         />
                    );
                })
            }
        </div>
    );
};
