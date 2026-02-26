import React from "react";
import styles from "./interactive-list-item.module.scss";


export default function InteractiveListItem(props: any) {
    const {id, index, content, remove, edite} = props;

        //menu
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const [activeItem, setActiveIttem] = React.useState<string|null>(null);
    
    const selectItem = (e: React.MouseEvent<HTMLLIElement>): void => {

    const id =  e.currentTarget?.id ?? null;
        if (id) {
            setShowMenu(prev => !prev);
            setActiveIttem(id);
            };
        };
    
    const editItem = (): void => {
        if(activeItem) {
            edite(activeItem)
        };
    };
    const removeItem = (): void => {
        if(activeItem) {
           remove(activeItem)
        };
    };

    return (
        <li 
            id={id}
            onClick={selectItem}
            className={styles.item}>

            <span className={ styles.circle} >{ index + 1}</span>
            <span>{ content }</span>

            <div
                className={`${styles.menu} ${showMenu?styles.menuShow:styles.menuHide}`}>

                <button type="button"
                    onClick={editItem}>
                        редактировать
                </button>

                <button type="button"
                    onClick={removeItem}>
                        удалить
                    </button>
            </div>

        </li>
    )
}