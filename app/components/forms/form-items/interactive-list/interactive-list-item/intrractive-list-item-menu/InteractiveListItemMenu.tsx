import React from "react";
import styles from "./interactive-list-item-menu.module.scss";

type InteractiveListItemMenuProps = { 
    remove: () => void;
    edite: () => void;
    isActive: boolean;
}
export default function interactiveListItemMenu(props: InteractiveListItemMenuProps) {
    const {remove, edite, isActive} = props;

    return (
        <div
            className={`${styles.menu} ${isActive?styles.menuShow:styles.menuHide}`}>

            <button
                type="button"
                onClick={remove}
                className={`${styles.menuBtn} ${styles.menuBtnRemove}`}>
                    удалить
            </button>
                    
            <button
                type="button"
                onClick={edite}
                className={`${styles.menuBtn} ${styles.menuBtnEdite}`}>
                    изменить
            </button>

        </div>
    )
}