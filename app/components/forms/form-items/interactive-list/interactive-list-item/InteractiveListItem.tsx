import React from "react";
import styles from "./interactive-list-item.module.scss";
import ItemMenu from "./intrractive-list-item-menu/InteractiveListItemMenu";


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

            <ItemMenu remove={removeItem} edite={editItem} isActive={showMenu}/>

        </li>
    )
}