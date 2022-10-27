// libs
import React, { useRef } from "react";

// components
import { SwiperAuto } from "@components/Slider";

// styles
import styles from "./icons.scss";
import fontSize from "@styles/fontSize.sass";

export const Icons = (readonlyProps) => {
    const rpc_filter_response = { ...readonlyProps.rpc_filter.response };
    const arr_productType = rpc_filter_response.data?.productType ?? [];
    
    const ref = useRef;

    const arrRef = Array(arr_productType.length).fill(ref).map(newHook => newHook(null));

    const addClass = (index) => {
        arrRef[index].current.classList.toggle(styles.active);

        for (let i = 0; i < arrRef.length; i++) {
            if (i === index) continue;

            if (arrRef[i].current.classList.contains(styles.active)) {
                arrRef[i].current.classList.remove(styles.active);

                break;
            }
        }
    };

    const submit = (index) => {

        const item = arr_productType[index];

        const params = {
            pageNum: 1,
            productTypeId: arrRef[index].current.classList.contains(styles.active) ? item.id : 0,
        };

        readonlyProps.action_rpc_models(params);
    };

    const onClick = (index) => {
        addClass(index);
        submit(index);
    };
    
    return (
        <div className={styles.wrapper}>
            <SwiperAuto settings={{ spaceBetween: 40 }}>
                {
                    arr_productType.map(({ image: svgElement, name: label }, index) => {
                        return (
                            <div key={index}>
                                <div className={styles.item}>
                                    <div ref={arrRef[index]} onClick={onClick.bind(null, index)}>
                                        <div className={styles.primitive} dangerouslySetInnerHTML={{ __html: svgElement }} />
                                        <span className={fontSize.s16}>{ label }</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </SwiperAuto>
        </div>
    );
};
