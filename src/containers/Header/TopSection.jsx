// libs
import React, { useState } from "react";

// components
import { Link } from "@components/Link";
import { Modal, Alert, Area } from "@components/Modal";
import { MaxWidthLazurit } from "@components/MaxWidth";
import { RenderBreakpoint, constants } from "@components/RenderBreakpoint";

// helpers
import { cookies } from "@helpers/cookies";
import { mergeClasses } from "@helpers/mergeClasses";
import { shiftElementArray } from "@helpers/shiftElementArray";

// images
import logoDekstopSVG from "@images/logoDekstop.svg";
import logoDeviceSVG from "@images/logoDevice.svg";
import triangleSVG from "@images/triangle.svg";
import locationSVG from "@images/location.svg";
import phoneSVG from "@images/phone.svg";

// styles
import styles from "./topSection.scss";
import fontSize from "@styles/fontSize.sass";
import buttonStyles from "@styles/button";

const DEVELOPMENT = 'development';
const {
    SCREEN_NOTE,
    SCREEN_PAD,
} = constants;
const COOKIE = 'userCity';

export const TopSection = (readonlyProps) => {
    const rpc_cities_response = { ...readonlyProps.rpc_cities.response };
    const arr_cities = rpc_cities_response.data?.list ?? [];
    const rpc_location_response = { ...readonlyProps.rpc_location.response };
    const data_location = { ...rpc_location_response?.data };

    let locationSuccess = rpc_location_response.success;
    
    const 
        [alertCityState, setAlertCityState] = useState(false),
        [citiesState, setCitiesState] = useState(false);

    const userCityCookie = cookies.has(COOKIE) ? JSON.parse(cookies.get(COOKIE)) : {};

    if (locationSuccess === false && !cookies.has(COOKIE) && !alertCityState) {
        setAlertCityState(true);
    }

    if (locationSuccess && !cookies.has(COOKIE)) {
        const value = {
            id: data_location.cityId,
            name: data_location.cityName,
        };

        cookies.set(COOKIE, JSON.stringify(value));

        const body = {
            key: 'userCity',
            value,
        };

        if (readonlyProps.rpc_cookie.done === 0) {
            readonlyProps.action_rpc_cookie({
                body,
            });
        }
        
    }

    const onClickCities = ({ id, name }) => {
        const value = {
            id,
            name,
        };

        cookies.remove(COOKIE);
        cookies.set(COOKIE, JSON.stringify(value));
        
        setCitiesState(false);

        remoteProcedureCall({ id, name });
    };

    const remoteProcedureCall = ({ id, name }) => {
        const value = {
            id,
            name,
        };

        const body = {
            key: 'userCity',
            value,
        };

        readonlyProps.action_rpc_cookie({
            body,
        });

        // refresh
        readonlyProps.action_rpc_filter();
        readonlyProps.action_rpc_models({
            pageNum: 1,
        });
    };

    arr_cities.sort(({ name: a }, { name: b }) => a.localeCompare(b));

    shiftElementArray(arr_cities, arr_cities.findIndex(({ id }) => id === '2'), 0);
    shiftElementArray(arr_cities, arr_cities.findIndex(({ id }) => id === '3'), 1);

    let anchor = '';
    const cities = arr_cities.reduce((result, item, index) => {
        const firstLetter = item.name[0].toUpperCase();

        if (firstLetter !== anchor && index >= 2) {
            anchor = firstLetter;
            result[--index].beforeLetter = true;
        }

        result.push(item);
        
        return result;
    }, []);
    
    return <>
        <Modal useOpen={[alertCityState, setAlertCityState]}>
            <Alert onClick={() => {setAlertCityState(false); setCitiesState(true);}}>
                <h1>Выберите город</h1>
                <span>В зависимости от выбранного города меняется цена и сроки доставки товара</span>
            </Alert>
        </Modal>
        <Modal useOpen={[citiesState, setCitiesState]}>
            <Area>
                <div className={styles.modal}>
                    <h1>Укажите Ваш город</h1>
                    <h2>Если Вы не нашли свой город, выберите ближайший</h2>
                    <ul>
                        {
                            cities.map((item, index) => {
                                return (
                                    <li key={index} className={mergeClasses(item.beforeLetter && styles.beforeLetter)}>
                                        <button 
                                            type="button" 
                                            className={mergeClasses(buttonStyles.text, fontSize.s16)} 
                                            onClick={onClickCities.bind(null, { id: item.id, name: item.name })}
                                        >
                                            { item.name }
                                        </button>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </Area>
        </Modal>
        <MaxWidthLazurit>
            <div className={styles.wrapper}>
                <div>
                    <Link href={process.env.NODE_ENV === DEVELOPMENT ? '/' : 'https://lazurit.com'}>
                        <RenderBreakpoint
                            jsx={<img src={logoDeviceSVG} width={150} height={11} alt="LAZURIT" />} 
                            rules={[[null, SCREEN_NOTE],]}
                         />
                        <RenderBreakpoint
                            jsx={<img src={logoDekstopSVG} width={229} height={38} alt="LAZURIT" />} 
                            rules={[[SCREEN_NOTE, null],]}
                         />
                    </Link>
                </div>
                <div className={styles.menu}>
                    <div>
                        <RenderBreakpoint
                            jsx={<Link href="https://lazurit.com/shops/" className={fontSize.s22}>Магазины</Link>} 
                            rules={[[SCREEN_NOTE, null],]}
                         />
                    </div>
                    <div>
                        <RenderBreakpoint
                            jsx={<img src={locationSVG} alt="Геодата" onClick={setCitiesState.bind(null, !citiesState)} />} 
                            rules={[[null, SCREEN_NOTE],]}
                         />
                        <RenderBreakpoint
                            jsx={
                                <span className={fontSize.s22} onClick={setCitiesState.bind(null, !citiesState)}>
                                    { userCityCookie.name ?? data_location.cityName ?? '!!Выберите город!!' }
                                    <img className={styles.triangle} src={triangleSVG} alt="Город" />
                                </span>
                            } 
                            rules={[[SCREEN_NOTE, null],]}
                         />
                    </div>
                    <div>
                        <RenderBreakpoint
                            jsx={<Link href="tel:+7 800 100-50-22" className={fontSize.s22}><img src={phoneSVG} alt="Телефон" /></Link>} 
                            rules={[[null, SCREEN_NOTE],]}
                         />
                        <RenderBreakpoint
                            jsx={<Link href="tel:+7 800 100-50-22" className={fontSize.s22}>8 800 505-49-25</Link>} 
                            rules={[[SCREEN_NOTE, SCREEN_PAD],]}
                         />
                        <RenderBreakpoint
                            jsx={<span className={mergeClasses(fontSize.s22, styles.notUnderline)}>8 800 505-49-25</span>} 
                            rules={[[SCREEN_PAD, null],]}
                         />
                    </div>
                </div>
            </div>
        </MaxWidthLazurit>
    </>;
};
