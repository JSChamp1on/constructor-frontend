// libs
import React, { useEffect, useRef, useState } from "react";

// components
import { MaxWidthContent } from "@components/MaxWidth";
import { Link } from "@components/Link";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./mobileBar.scss";

const 
    UP = 'up',
    DOWN = 'down';

export const MobileBar = () => {
    const position = useRef(0);

    const [scrollDirectionState, setScrollDirectionState] = useState(UP);

    useEffect(() => {
        window.addEventListener('scroll', scrollEvent, false);

        return () => {
            window.removeEventListener('scroll', scrollEvent, false);
        };
    }, []);

    const scrollEvent = () => {
        const body = document.body

        const extremePosition = body.scrollHeight - body.offsetHeight;
        const scrollY = window.scrollY;

        if (extremePosition >= scrollY && extremePosition < scrollY + 20) {
            setScrollDirectionState(UP);
            return null;
        }
        if (position.current > scrollY) {
            setScrollDirectionState(UP);
        }
        if (position.current < scrollY) {
            setScrollDirectionState(DOWN);
        }

        position.current = scrollY;
    };

    return (
        <div className={mergeClasses(styles.wrapper, styles[`wrapper_${scrollDirectionState}`])}>
            <MaxWidthContent>
                <menu>
                    <Link href="https://lazurit.com">
                        <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 9.98828L12.5 2.98828L21.5 9.98828V20.9883C21.5 21.5187 21.2893 22.0274 20.9142 22.4025C20.5391 22.7776 20.0304 22.9883 19.5 22.9883H5.5C4.96957 22.9883 4.46086 22.7776 4.08579 22.4025C3.71071 22.0274 3.5 21.5187 3.5 20.9883V9.98828Z" stroke="#63636C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 22.9883V12.9883H15.5V22.9883" stroke="#63636C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Главная</span>
                    </Link>
                    <Link href="https://lazurit.com/catalog/favorites/">
                        <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.112 7.31439C19.6722 6.89397 19.15 6.56047 18.5752 6.33293C18.0005 6.1054 17.3844 5.98828 16.7623 5.98828C16.1401 5.98828 15.5241 6.1054 14.9493 6.33293C14.3746 6.56047 13.8524 6.89397 13.4126 7.31439L12.4998 8.18649L11.587 7.31439C10.6986 6.46558 9.49364 5.98872 8.23725 5.98872C6.98085 5.98872 5.77591 6.46558 4.88751 7.31439C3.9991 8.1632 3.5 9.31444 3.5 10.5148C3.5 11.7152 3.9991 12.8665 4.88751 13.7153L5.80029 14.5874L12.4998 20.9883L19.1992 14.5874L20.112 13.7153C20.5521 13.2951 20.9011 12.7961 21.1393 12.247C21.3774 11.6978 21.5 11.1093 21.5 10.5148C21.5 9.92042 21.3774 9.33183 21.1393 8.78268C20.9011 8.23354 20.5521 7.73461 20.112 7.31439V7.31439Z" stroke="#63636C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Избранное</span>
                    </Link>
                    <Link href="https://lazurit.com/catalog/krovati-i-matrasy/" rel="noopener">
                        <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 3.98828H3.5V10.9883H10.5V3.98828Z" stroke="#63636C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21.5 3.98828H14.5V10.9883H21.5V3.98828Z" stroke="#63636C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21.5 14.9883H14.5V21.9883H21.5V14.9883Z" stroke="#63636C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.5 14.9883H3.5V21.9883H10.5V14.9883Z" stroke="#63636C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Каталог</span>
                    </Link>
                    <Link href="https://lazurit.com/personal/cart/">
                        <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.7558 5.95148H7.08546C6.91648 5.11491 6.46663 4.3628 5.81213 3.82287C5.15763 3.28294 4.33863 2.98811 3.49374 2.98828H2.23299C2.03859 2.98828 1.85215 3.06632 1.71469 3.20524C1.57723 3.34415 1.5 3.53257 1.5 3.72902C1.5 3.92548 1.57723 4.11389 1.71469 4.2528C1.85215 4.39172 2.03859 4.46976 2.23299 4.46976H3.49374C4.00171 4.47 4.49392 4.64795 4.88676 4.97338C5.2796 5.29881 5.54885 5.75164 5.64875 6.25495L7.29513 14.6379L7.18704 14.6478C6.41335 14.7247 5.6984 15.0989 5.18967 15.693C4.68095 16.287 4.41725 17.0558 4.45298 17.8406C4.48871 18.6254 4.82114 19.3665 5.38169 19.9108C5.94224 20.4552 6.68816 20.7614 7.46557 20.7663H8.19111C8.22519 20.8996 8.26857 21.0309 8.32114 21.1592C8.54305 21.7006 8.91885 22.1634 9.40101 22.4889C9.88317 22.8145 10.45 22.9883 11.0299 22.9883C11.8075 22.9883 12.5533 22.6761 13.1032 22.1205C13.4765 21.7431 13.7388 21.2745 13.8687 20.7665H16.987C17.0211 20.8998 17.0645 21.031 17.117 21.1592C17.3389 21.7006 17.7147 22.1634 18.1969 22.4889C18.679 22.8145 19.2459 22.9883 19.8258 22.9883C20.6034 22.9883 21.3492 22.6761 21.899 22.1205C22.4489 21.5648 22.7578 20.8111 22.7578 20.0253C22.7578 19.4393 22.5858 18.8664 22.2636 18.3792C21.9415 17.8919 21.4836 17.5122 20.9478 17.2879C20.4121 17.0636 19.8225 17.005 19.2538 17.1193C18.6851 17.2336 18.1626 17.5158 17.7526 17.9302C17.3814 18.3053 17.1175 18.7734 16.9868 19.285H13.8689C13.787 18.9641 13.6519 18.6577 13.4678 18.3792C13.1456 17.8919 12.6877 17.5122 12.1519 17.2879C11.6162 17.0636 11.0267 17.005 10.4579 17.1193C9.88918 17.2336 9.36676 17.5158 8.95671 17.9302C8.58562 18.3052 8.32166 18.7732 8.191 19.2848H7.46557C7.0515 19.3044 6.64666 19.1571 6.34012 18.8751C6.03357 18.5931 5.85044 18.1995 5.831 17.7811C5.81156 17.3626 5.9574 16.9535 6.23645 16.6437C6.5155 16.334 6.9049 16.1489 7.31897 16.1292L21.3705 14.8404C21.5279 14.8259 21.6765 14.7604 21.794 14.6536C21.9116 14.5468 21.9919 14.4044 22.0228 14.2478L23.4888 6.84036C23.5078 6.73167 23.5025 6.62005 23.4734 6.51368C23.4442 6.4073 23.3919 6.30886 23.3202 6.22555C23.252 6.14058 23.166 6.07193 23.0684 6.02454C22.9709 5.97715 22.8641 5.9522 22.7558 5.95148ZM20.6815 13.4107L8.79176 14.5007L7.38114 7.43296H21.8616L20.6815 13.4107ZM12.4954 19.9865C12.4856 19.6077 12.3324 19.2464 12.0665 18.9778C11.7916 18.6999 11.4187 18.5438 11.0299 18.5438C10.74 18.5438 10.4566 18.6307 10.2155 18.7935C9.97439 18.9563 9.78649 19.1877 9.67553 19.4584C9.56458 19.7291 9.53555 20.027 9.59211 20.3143C9.64868 20.6017 9.7883 20.8657 9.99332 21.0729C10.1983 21.2801 10.4596 21.4212 10.7439 21.4783C11.0283 21.5355 11.3231 21.5062 11.5909 21.394C11.8588 21.2819 12.0878 21.092 12.2489 20.8484C12.4027 20.6157 12.4881 20.3439 12.4954 20.0647C12.4947 20.0518 12.4944 20.0388 12.4944 20.0258C12.4944 20.0126 12.4947 19.9995 12.4954 19.9865ZM19.0113 18.7935C19.2524 18.6307 19.5359 18.5438 19.8258 18.5438C20.2146 18.5438 20.5875 18.6999 20.8624 18.9778C21.1373 19.2556 21.2918 19.6324 21.2918 20.0253C21.2918 20.3183 21.2058 20.6048 21.0447 20.8484C20.8836 21.092 20.6547 21.2819 20.3868 21.394C20.1189 21.5062 19.8242 21.5355 19.5398 21.4783C19.2554 21.4212 18.9942 21.2801 18.7892 21.0729C18.5842 20.8657 18.4445 20.6017 18.388 20.3143C18.3314 20.027 18.3604 19.7291 18.4714 19.4584C18.5824 19.1877 18.7703 18.9563 19.0113 18.7935Z" fill="#63636C" stroke="#63636C" strokeWidth="0.3" />
                        </svg>
                        <span>Корзина</span>
                    </Link>
                    <Link href="https://lazurit.com/personal/">
                        <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5 12.9883C22.5 7.47437 18.0143 2.98828 12.5 2.98828C6.98568 2.98828 2.5 7.47437 2.5 12.9883C2.5 15.808 3.67767 18.3538 5.56137 20.1735C5.60547 20.2309 5.6577 20.2775 5.71884 20.3167C7.5032 21.969 9.8819 22.9883 12.5 22.9883C15.1181 22.9883 17.4968 21.969 19.2812 20.3167C19.3423 20.2775 19.3945 20.2309 19.4386 20.1735C21.3223 18.3538 22.5 15.808 22.5 12.9883ZM12.5 4.23828C17.325 4.23828 21.25 8.16366 21.25 12.9883C21.25 15.0341 20.5389 16.914 19.3581 18.4057C18.816 16.6575 17.2684 15.2889 15.168 14.6592C16.3127 13.8308 17.0614 12.4887 17.0614 10.9721C17.0614 8.46029 15.0155 6.41683 12.5 6.41683C9.98454 6.41683 7.93864 8.46029 7.93864 10.9721C7.93864 12.4887 8.68734 13.8308 9.832 14.6592C7.73158 15.2889 6.18398 16.6575 5.64189 18.4057C4.46106 16.914 3.75 15.0341 3.75 12.9883C3.75 8.16366 7.67497 4.23828 12.5 4.23828ZM9.18864 10.9721C9.18864 9.14958 10.6738 7.66683 12.5 7.66683C14.3262 7.66683 15.8114 9.14958 15.8114 10.9721C15.8114 12.7946 14.3262 14.2773 12.5 14.2773C10.6738 14.2773 9.18864 12.7946 9.18864 10.9721ZM6.6923 19.5149C6.88019 17.2233 9.3103 15.5273 12.5 15.5273C15.6897 15.5273 18.1198 17.2233 18.3077 19.5149C16.7609 20.8929 14.7298 21.7383 12.5 21.7383C10.2702 21.7383 8.23908 20.8929 6.6923 19.5149Z" fill="#63636C" stroke="#63636C" strokeWidth="0.5" />
                        </svg>
                        <span>Профиль</span>
                    </Link>
                </menu>
            </MaxWidthContent>
        </div>
    );
};