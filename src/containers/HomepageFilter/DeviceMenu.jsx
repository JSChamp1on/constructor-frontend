// libs
import React, { Fragment, useRef, useState } from "react";

// app
import { Portal } from "@app";

// components
import { DropdownClickClose, DropdownNoClose } from "@components/Dropdown";
import { ButtonMetamorphosis, ButtonSideMenu } from "@components/Button";
import { Radiobutton } from "@components/Radiobutton";
import { Checkbox } from "@components/Checkbox";
import { Rolling } from "@components/Rolling";
import { AreaStandart, AreaSideMenu } from "@components/Area";
import { SideMenu } from "@components/SideMenu";

// images
import filterSVG from "@images/filter.svg";

// styles
import styles from "./deviceMenu.scss";
import fontSize from "@styles/fontSize.sass";

export const DeviceMenu = (readonlyProps) => {
    const rpc_filter_response = { ...readonlyProps.rpc_filter.response };
    const arr_filter = rpc_filter_response.data?.filter ?? [];

    const rpc_models_request = { ...readonlyProps.rpc_models.request };
    const request_models_params = rpc_models_request?.params ?? {};
    
    const rpc_sort_response = { ...readonlyProps.rpc_sort.response };
    const arr_sort = rpc_sort_response?.data ?? [];

    const formFilterRef = useRef(null);
    const formSortRef = useRef(null);

    const [sortByPriceState, setSortByPriceState] = useState("По возрастанию цены");
    const [sideMenuState, setSideMenuState] = useState(false);

    const restoringSelectedParameters = JSON.parse(rpc_models_request.params?.filter ?? '{}');

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(formFilterRef.current);
        const entries = [ ...formData.entries() ];

        const obj = {};

        for (let i = 0; i < entries.length; i++) {
            const [key, value] = entries[i];
            const [identify, entity, purpose] = key.split('_');

            if (identify === 'rolling') {
                obj[entity] = obj[entity] ?? [];

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
        
        const params = {
            pageNum: 1,
            filter: obj,
        };

        readonlyProps.action_rpc_models(params);
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

    return (
        <div className={styles.wrapper}>
            <form ref={formSortRef} onChange={onChangeSort}>
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
            <button type="button" onClick={setSideMenuState.bind(null, true)}>
                <img src={filterSVG} alt="" />
                <span className={fontSize.s14}>Фильтр</span>
            </button>
            <Portal>
                <form ref={formFilterRef} onSubmit={onSubmit}>
                    <SideMenu label="Фильтры" useOpen={[sideMenuState, setSideMenuState]}>
                        {
                            arr_filter.map((item, index) => {
                                // rolling
                                if (!item.is_multiple && item.is_toddler) {
                                    return <Fragment key={index}>
                                        <DropdownNoClose 
                                            ButtonJSX={
                                                <ButtonSideMenu type="button">{ item.name }</ButtonSideMenu>
                                            }
                                            AreaJSX={
                                                <AreaSideMenu width="100%">
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
                                                     />
                                                </AreaSideMenu>
                                            }
                                         />
                                    </Fragment>;
                                }

                                // checkbox
                                if (item.is_multiple && !item.is_toddler) {
                                    return <Fragment key={index}>
                                        <DropdownNoClose 
                                            ButtonJSX={
                                                <ButtonSideMenu type="button">{ item.name }</ButtonSideMenu>
                                            }
                                            AreaJSX={
                                                <AreaSideMenu width="100%">
                                                    <div style={{ margin: '-16px 0' }}>
                                                        {
                                                            item.value.map((itemVal, index) => {
                                                                const checked = restoringSelectedParameters[item.code]?.indexOf(itemVal.id) >= 0;

                                                                return <Fragment key={index}>
                                                                    <Checkbox name={`checkbox_${item.code}_${itemVal.id}`} label={itemVal.name} {...{checked}} />
                                                                </Fragment>;
                                                            })
                                                        }
                                                    </div>
                                                </AreaSideMenu>
                                            }
                                         />
                                    </Fragment>;
                                }

                                // radio
                                if (!item.is_multiple && !item.is_toddler) {
                                    return <Fragment key={index}>
                                        <DropdownNoClose 
                                            ButtonJSX={
                                                <ButtonSideMenu type="button">{ item.name }</ButtonSideMenu>
                                            }
                                            AreaJSX={
                                                <AreaSideMenu width="100%">
                                                    <div style={{ margin: '-16px 0 -20px 0' }}>
                                                        {
                                                            item.value.map((itemVal, index) => {
                                                                const checked = restoringSelectedParameters[item.code]?.indexOf(itemVal.id) >= 0;

                                                                return <Fragment key={index}>
                                                                    <Radiobutton name={`radio_${item.code}`} value={itemVal.id} label={itemVal.name} {...{checked}} />
                                                                </Fragment>
                                                            })
                                                        }
                                                    </div>
                                                </AreaSideMenu>
                                            }
                                         />
                                    </Fragment>;
                                }
                            })
                        }
                    </SideMenu>
                </form>
            </Portal>
        </div>
    );
};
