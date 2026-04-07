import React from "react";
import styles from "./footer-menu.module.scss";
import ArrowBtn from "@/components/buttons/ArrowBtn";
import CrossBtn from "@/components/buttons/CrossBtn";
import Reset from "@/assets/svg/rotate-left-solid.svg";

type FooterMenuProps = {
    back: { action: () => void, permission: boolean };
    cross: { action: () => void, isPlus: boolean, permission: boolean};
    reset?: {action: () => void, permission: boolean};
    next: { action: () => void, permission: boolean };
    className?: string;
};

export default function FooterMenu({ back, cross, next, reset, className}: FooterMenuProps) {

    return (

        <div className={`${styles.menu} ${className}`}>

            <ArrowBtn 
                action={back.action} 
                disabled={!back.permission} 
                direction={0} 
                className={`${styles.btn} ${back.permission ? styles.btnEnabled : styles.btnDisabled}`}/>

            <div className={styles.menuCentralWrapper}>

                {reset ? 
                <Reset 
                    onClick={reset?.action} 
                    className={`${styles.btn} ${styles.menuBtnReset} ${reset.permission ? styles.btnEnabled : styles.btnDisabled}`}/>
                : null}
                <CrossBtn  
                    action={cross.action} 
                    isPlus={cross.isPlus} 
                    disabled={!cross.permission}
                    className={`${styles.btn} ${cross.permission ? styles.btnEnabled : styles.btnDisabled}`} />

            </div>

            <ArrowBtn 
                action={next.action} 
                disabled={!next.permission} 
                direction={1} 
                className={`${styles.btn} ${next.permission ? styles.btnEnabled : styles.btnDisabled}`}/>

        </div>
    
    )
}