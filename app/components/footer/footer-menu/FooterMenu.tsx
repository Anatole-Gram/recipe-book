import React from "react";
import styles from "./footer-menu.module.scss";
import ArrowBtn from "@/components/buttons/ArrowBtn";
import CrossBtn from "@/components/buttons/CrossBtn";

type FooterMenuProps = {
    back: { action: () => void, permission: boolean };
    cross: { action: () => void, state: boolean };
    next: { action: () => void, permission: boolean };
};

export default function FooterMenu(props: FooterMenuProps) {

    const { back, cross, next } = props;

    return (

        <div className={styles.menu}>

            <ArrowBtn action={back.action} disabled={back.permission} direction={0} className={styles.btn }/>

            <CrossBtn action={cross.action} isPlus={cross.state} className={`${styles.cross} ${styles.btn}`} />

            <ArrowBtn action={next.action} disabled={next.permission} direction={1} className={styles.btn }/>

        </div>
    
    )
}