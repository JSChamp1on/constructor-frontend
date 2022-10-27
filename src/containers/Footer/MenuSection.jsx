// libs
import React from "react";

// components
import { Link } from "@components/Link";
import { MaxWidthContent } from "@components/MaxWidth";
import { RenderBreakpoint, constants } from "@components/RenderBreakpoint";

// styles
import styles from "./menuSection.scss";
import fontSize from "@styles/fontSize.sass";

const {
    SCREEN_NOTE,
    SCREEN_PAD,
} = constants;

export const MenuSection = () => {
    return (
        <MaxWidthContent>
            <div className={styles.wrapper}>
                <div className={styles.company}>
                    <h2>О компании</h2>
                    <nav className={fontSize.s16}>
                        <Link href="https://lazurit.com/about/">О компании</Link>
                        <Link href="https://lazurit.com/about/vacancies/">Вакансии</Link>
                        <Link href="https://lazurit.com/contacts/">Контакты</Link>
                        <Link href="https://lazurit.com/shops/">Магазины</Link>
                        <Link href="https://lazurit.com/franshiza/">Франшиза</Link>
                        <Link href="https://lazurit.com/work_conditions/">Трудовые требования</Link>
                        <Link href="https://lazurit.com/site_map/">Карта сайта</Link>
                        <Link href="https://lazurit.com/upload/educational_program.pdf">Программа обучения дизайнеров</Link>
                    </nav>
                </div>
                <div className={styles.buyer}>
                    <h2>Покупателю</h2>
                    <nav className={fontSize.s16}>
                        <Link href="https://lazurit.com/discounts/">Акции</Link>
                        <Link href="https://lazurit.com/delivery/">Доставка и сборка</Link>
                        <Link href="https://lazurit.com/payment/">Оплата</Link>
                        <Link href="https://lazurit.com/payment/installment/index.php">Рассрочка</Link>
                        <Link href="https://lazurit.com/homeideas/">Идеи для дома</Link>
                        <Link href="https://lazurit.com/furniture_care/">Уход за мебелью</Link>
                        <Link href="https://lazurit.com/services/">Все услуги</Link>
                        <Link href="https://lazurit.com/bank_of_ideas/">Банк идей</Link>
                        <Link href="https://lazurit.com/fortuna/">Акция «Колесо Фортуны»</Link>
                        <Link href="https://lazurit.com/gift_cards_sale/">Подарочные карты</Link>
                    </nav>
                </div>
                <div className={styles.service}>
                    <h2>Сервисы</h2>
                    <nav className={fontSize.s16}>
                        <Link href="https://lazurit.com/warranty/">Гарантийные обязательства</Link>
                        <Link href="https://lazurit.com/sell_conditions/">Условия продажи товаров</Link>
                        <Link href="https://lazurit.com/spetsialnaya-otsenka-usloviy-truda/">Специальная оценка условий труда</Link>
                        <Link href="https://lazurit.com/confident/">Политика конфиденциальности</Link>
                        <Link href="https://lazurit.com/agreement/">Пользовательское соглашение</Link>
                        <Link href="https://lazurit.com/alfa-bank/">Правила оплаты Альфа Банк</Link>
                        <Link href="https://7c500754.flowpaper.com/Lazuritkorpus2022web/">Каталог корпусной мебели Лазурит</Link>
                        <Link href="https://7c500754.flowpaper.com/Lazuritkitchen2022web1/#page=1">Каталог кухонь Лазурит</Link>
                        <Link href="https://7c500754.flowpaper.com/Lazuritmyagkayamebel2022web1/">Каталог мягкой мебели Лазурит</Link>
                    </nav>
                </div>
                <div className={styles.contact}>
                    <h2>Контакты</h2>
                    <p>
                        Единая справочная:
                        <br />
                        <RenderBreakpoint
                            jsx={<Link href="tel:+7 800 100-50-22">8 800 100 50 22</Link>} 
                            rules={[[null, SCREEN_PAD],]}
                         />
                        <RenderBreakpoint
                            jsx={<span>8 800 505-49-25</span>} 
                            rules={[[SCREEN_PAD, null],]}
                         />
                        <br />
                        Звонок по России бесплатный.
                        Режим работы: с 02:00 до 23:00 (МСК).
                    </p>
                </div>
            </div>
        </MaxWidthContent>
    );
}