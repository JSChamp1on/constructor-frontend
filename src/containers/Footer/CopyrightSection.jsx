// libs
import React from "react";

// components
import { Link } from "@components/Link";
import { MaxWidthContent } from "@components/MaxWidth";

// images
import visaSVG from "@images/braid/visa.svg";
import masterCardSVG from "@images/braid/masterCard.svg";
import mirSVG from "@images/braid/mir.svg";
import sberbankSVG from "@images/braid/sberbank.svg";
import xalvaSVG from "@images/braid/xalva.svg";
import alphaBankSVG from "@images/braid/alphaBank.svg";
import sbpSVG from "@images/braid/sbp.svg";
import tikTokSVG from "@images/socialNetwork/tikTok.svg";
import vkSVG from "@images/socialNetwork/vk.svg";
import facebookSVG from "@images/socialNetwork/facebook.svg";
import youtubeSVG from "@images/socialNetwork/youtube.svg";
import okSVG from "@images/socialNetwork/ok.svg";

// styles
import styles from "./copyrightSection.scss";
import fontSize from "@styles/fontSize.sass";

export const CopyrightSection = () => {
    return (
        <MaxWidthContent>
            <div className={styles.wrapper}>
                <div className={styles.flexbox}>
                    <div className={styles.linePay}>
                        <span className={fontSize.s16}>Принимаем к оплате&nbsp;</span>
                        <img src={visaSVG} alt="" />
                        <img src={masterCardSVG} alt="" />
                        <img src={mirSVG} alt="" />
                        <img src={sberbankSVG} alt="" />
                        <img src={xalvaSVG} alt="" />
                        <img src={alphaBankSVG} alt="" />
                        <img src={sbpSVG} alt="" />
                    </div>
                    <div className={styles.lineSocial}>
                        <Link href="http://vm.tiktok.com/ZSJjLkpHK/" target="_blank" rel="noopener">
                            <img src={tikTokSVG} width={30} height={30} alt="tik tok" />
                        </Link>
                        <Link href="http://vk.com/lazurit" target="_blank" rel="noopener">
                            <img src={vkSVG} width={30} height={30} alt="vk" />
                        </Link>
                        <Link href="http://ok.ru/tdlazurit" target="_blank" rel="noopener">
                            <img src={okSVG} width={30} height={30} alt="ok" />
                        </Link>
                        <Link href="http://youtube.com/channel/UCkdwUfBw5jbhd8YinxEkPaQ" target="_blank" rel="noopener">
                            <img src={youtubeSVG} width={30} height={30} alt="youtube" />
                        </Link>
                    </div>
                    <div className={styles.copyright}>
                        <span className={fontSize.s16}>© Торговый дом «Лазурит», 2022</span>
                    </div>
                </div>
                
            </div>
        </MaxWidthContent>
    );
};