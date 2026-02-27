import React from "react";
import styles from "./interactive-list-item-menu.module.scss";
import MenuBtn from "@/components/buttons/ButtonTemplate";


export default function interactiveListItemMenu(props: any) {
    const {remove, edite, isActive} = props;

    return (
        <div
            className={`${styles.menu} ${isActive?styles.menuShow:styles.menuHide}`}>
            
            <MenuBtn action={remove} btnText="удалить" className={`${styles.menuBtn} ${styles.menuBtnRemove}`}/>

            <MenuBtn action={edite} btnText="изменить" className={`${styles.menuBtn} ${styles.menuBtnEdite}`}/>

        </div>
    )
}