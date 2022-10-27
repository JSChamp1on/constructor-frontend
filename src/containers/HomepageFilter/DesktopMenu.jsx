// libs
import React, { Fragment, useRef, useState } from "react";

// components
import { DropdownClickClose } from "@components/Dropdown";
import { ButtonMetamorphosis } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Radiobutton } from "@components/Radiobutton";
import { Rolling } from "@components/Rolling";
import { AreaStandart } from "@components/Area";

// images
import closeSVG from "@images/close.svg"

// styles
import styles from "./desktopMenu.scss";
import fontSize from "@styles/fontSize.sass";

export const DesktopMenu = (readonlyProps) => {
    const rpc_filter_response = { ...readonlyProps.rpc_filter.response };
    const arr_filter = rpc_filter_response.data?.filter || [];

    const rpc_models_request = { ...readonlyProps.rpc_models.request };
    const request_models_params = rpc_models_request?.params ?? {};

    const rpc_sort_response = { ...readonlyProps.rpc_sort.response };
    const arr_sort = rpc_sort_response?.data ?? [];

    const formFilterRef = useRef(null);
    const formSortRef = useRef(null);

    const [sortByPriceState, setSortByPriceState] = useState("По возрастанию цены");

    const restoringSelectedParameters = JSON.parse(rpc_models_request.params.filter ?? '{}');

    const onChange = (_, codes) => {
        const formData = new FormData(formFilterRef.current);
        const entries = [ ...formData.entries() ];

        const obj = {};

        for (let i = 0; i < entries.length; i++) {
            const [key, value] = entries[i];
            const [identify, entity, purpose] = key.split('_');

            if (identify === 'rolling') {
                obj[entity] = obj[entity] ?? [null, null];

                if (purpose === 'left') {
                    obj[entity][0] = Number(value);
                }
                if (purpose === 'right') {
                    obj[entity][1] = Number(value);
                }
            }

            if (identify === 'checkbox') {
                obj[entity] = obj[entity] ?? [];

                obj[entity].push(Number(purpose));
            }

            if (identify === 'radio') {
                obj[entity] = obj[entity] ?? [];
                
                obj[entity].push(Number(value));
            }
        }
        
        Object.keys(restoringSelectedParameters).forEach((code) => {
            if (obj[code] === undefined) {
                obj[code] = undefined;
            }
        });
        
        codes?.forEach((code) => {
            obj[code] = undefined;
        });

        const params = {
            pageNum: 1,
            filter: obj,
        };
        
        readonlyProps.action_rpc_models(params);

        return false;
    };

    const onChangeSort = () => {
        const formData = new FormData(formSortRef.current);
        const entries = [ ...formData.entries() ];

        const [sortBy, sortOrder, label] = entries[0][1].split('_');

        setSortByPriceState(label);

        const params = {
            pageNum: 1,
            sortBy,
            sortOrder,
        };

        readonlyProps.action_rpc_models(params);
    };
    
    return <>
        <div className={styles.wrapper}>
            <form ref={formFilterRef} className={styles.form} onChange={onChange}>
                {
                    arr_filter.map((item, index) => {
                        // rolling
                        if (!item.is_multiple && item.is_toddler) {
                            return <Fragment key={index}>
                                <DropdownClickClose 
                                    ButtonJSX={
                                        <ButtonMetamorphosis type="button">{ item.name }</ButtonMetamorphosis>
                                    }
                                    AreaJSX={
                                        <AreaStandart width="260px">
                                            <Rolling 
                                                name={[
                                                    `rolling_${item.code}_left`,
                                                    `rolling_${item.code}_right`,
                                                ]}
                                                initialValue={restoringSelectedParameters[item.code]}
                                                defaultValue={[
                                                    item.value[0].value,
                                                    item.value[1].value,
                                                ]}
                                                dotMouseUp={() => onChange()}
                                             />
                                        </AreaStandart>
                                    }
                                 />
                            </Fragment>;
                        }

                        // checkbox
                        if (item.is_multiple && !item.is_toddler) {
                            return <Fragment key={index}>
                                <DropdownClickClose 
                                    ButtonJSX={
                                        <ButtonMetamorphosis type="button">{ item.name }</ButtonMetamorphosis>
                                    }
                                    AreaJSX={
                                        <AreaStandart windth="" height="162px">
                                            <div style={{ margin: '-16px 0' }}>
                                                {
                                                    item.value.map((itemVal, index) => {
                                                        const checked = restoringSelectedParameters[item.code]?.indexOf(itemVal.id) >= 0;
                                                        const onChange = Function();

                                                        return <Fragment key={index}>
                                                            <Checkbox name={`checkbox_${item.code}_${itemVal.id}`} label={itemVal.name} {...{checked, onChange}} />
                                                        </Fragment>;
                                                    })
                                                }
                                            </div>
                                        </AreaStandart>
                                    }
                                 />
                            </Fragment>;
                        }

                        // radio
                        if (!item.is_multiple && !item.is_toddler) {
                            return <Fragment key={index}>
                                <DropdownClickClose 
                                    ButtonJSX={
                                        <ButtonMetamorphosis type="button">{ item.name }</ButtonMetamorphosis>
                                    }
                                    AreaJSX={
                                        <AreaStandart width="" height="250px">
                                            <div style={{ margin: '-16px 0 -20px 0' }}>
                                                {
                                                    item.value.map((itemVal, index) => {
                                                        const checked = restoringSelectedParameters[item.code]?.indexOf(itemVal.id) >= 0;
                                                        const onChange = Function();

                                                        return <Fragment key={index}>
                                                            <Radiobutton name={`radio_${item.code}`} value={itemVal.id} label={itemVal.name} {...{checked, onChange}} />
                                                        </Fragment>
                                                    })
                                                }
                                            </div>
                                        </AreaStandart>
                                    }
                                 />
                            </Fragment>;
                        }
                    })
                }
            </form>
            <form ref={formSortRef} className={styles.formPrice} onChange={onChangeSort}>
                <DropdownClickClose 
                    ButtonJSX={
                        <ButtonMetamorphosis type="button">{ sortByPriceState }</ButtonMetamorphosis>
                    }
                    AreaJSX={
                        <AreaStandart width="200px" height="">
                            <div style={{ margin: '-16px 0 -20px 0' }}>
                                {
                                    request_models_params['sortBy']
                                    && request_models_params['sortOrder']
                                    && arr_sort.map((item, index) => {
                                        const defaultChecked = (
                                            item.sortBy === request_models_params['sortBy']
                                            && item.sortOrder === request_models_params['sortOrder']
                                        );
                                        
                                        if (defaultChecked && item.name !== sortByPriceState) {
                                            setSortByPriceState(item.name);
                                        }
                                        
                                        return <Fragment key={index}>
                                            <Radiobutton 
                                                name={item.code} 
                                                value={`${item.sortBy}_${item.sortOrder}_${item.name}`} 
                                                label={item.name} 
                                                defaultChecked={defaultChecked}
                                            />
                                        </Fragment>;
                                    })
                                }
                            </div>
                        </AreaStandart>
                    }
                 />
            </form>
        </div>
        {
            (() => {
                const keys = Object.keys(restoringSelectedParameters);
                
                const entitys = arr_filter.filter((item) => {
                    return keys.indexOf(item.code) >= 0;
                });

                const result = entitys.map((item, index) => {
                    const filter = item.value.filter((val) => {
                        if (item.is_multiple === false && item.is_toddler === true) {
                            return false;
                        }
                        
                        if (restoringSelectedParameters[item.code].some((id) => {
                            return id === val.id
                        })) {
                            return true;
                        }
                    });
                    
                    if (item.is_multiple === false && item.is_toddler === true) {
                        if (!item.value.some(({ value }, index) => restoringSelectedParameters[item.code][index] !== value)) {
                            return null;
                        }
                    }

                    return (
                        <li key={index}>
                            <span className={fontSize.s16}>
                                { item.name }:&nbsp;
                                {
                                    item.is_multiple === false && item.is_toddler === true
                                        ? `${restoringSelectedParameters[item.code][0]} - ${restoringSelectedParameters[item.code][1]}`
                                        : filter.map(({ name }) => name).join(', ') 
                                }
                            </span>
                            <button type="button" onClick={() => onChange(null, [item.code])}>
                                <img src={closeSVG} alt="close" />
                            </button>
                        </li>
                    );
                }).filter(item => item);
                
                return (
                    result.length
                        ? (
                            <ul className={styles.filterParams}>
                                { result }
                                <li className={styles.clearFilter}>
                                    <button 
                                        type="button" 
                                        className={fontSize.s18}
                                        onClick={() => onChange(null, entitys.map(({ code }) => code))}
                                    >
                                        Очистить все
                                    </button>
                                </li>
                            </ul>
                        )
                        : null
                );
            })()
        }
    </>;
};
