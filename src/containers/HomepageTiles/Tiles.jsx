// libs
import React, { useEffect, useState } from "react";

// containers
import { Card } from "@containers/HomepageTiles";
import { Pagination } from "@components/Pagination";

// styles
import styles from "./tiles.scss";

export const Tiles = (readonlyProps) => {
    const rpc_models_response = { ...readonlyProps.rpc_models.response };
    const data_models = { ...rpc_models_response?.data };
    const list_models = data_models?.list ?? [];
    
    const [listState, setListState] = useState([]);
    const [currentPageState, setCurrentPageState] = useState(null);
    const [saveTotalCount, setSaveTotalCount] = useState(0);

    useEffect(() => {
        if (readonlyProps.rpc_models.response) {
            setListState(list_models);
            setSaveTotalCount(data_models.count);
        }
    }, [readonlyProps.rpc_models.response]);

    const queryPage = (index) => {
        const params = {
            pageNum: ++index,
        };
        
        setCurrentPageState(index);

        readonlyProps.action_rpc_models(params);
    };
    
    if (listState.length) {
        listState.sort(({ sort: a }, { sort: b }) => a - b);
    }
    
    return <>
        {
            readonlyProps.rpc_models.done === 1
            && !listState.length
            && (
                <span>По критериям поиска ничего не найдено</span>
            )
        }
        <div className={styles.wrapper}>
            {
                listState.map((item, index) => (
                    <Card key={index} data={item} />
                ))
            }
            {
                Array(2).fill(<div />).map((item, index) => ({...item, key: index, props: {style: {margin: 0}}}))
            }
        </div>
        <div style={{ margin: '28px 0', textAlign: 'center' }}>
            <Pagination 
                totalCount={saveTotalCount} 
                displayedCount={readonlyProps.rpc_models.request?.params?.limit ?? 0} 
                useChange={[Number(currentPageState ?? readonlyProps.rpc_models.request?.params?.pageNum ?? 1) -1, queryPage]} 
            />
        </div>
    </>;
};
