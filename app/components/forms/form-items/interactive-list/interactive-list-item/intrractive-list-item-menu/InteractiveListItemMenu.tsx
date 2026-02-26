import React from "react";
import styles from "./interactive-list-item-menu.module.scss";


export default function interactiveListItemMenu(props: any) {
    const {remove, edite, isActive} = props;

    return (
        <div
            className={`${styles.menu} ${isActive?styles.menuShow:styles.menuHide}`}>

            <button type="button"
                onClick={edite}>
                    редактировать
            </button>

            <button type="button"
                onClick={remove}>
                    удалить
            </button>

        </div>
    )
}