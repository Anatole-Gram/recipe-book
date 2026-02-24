import React from "react";
import styles from "./recipe-form-ingredients-list.module.scss"
import { IngredientListProps } from "@/components/forms/recipe-form/RecipeForm.types"
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { setIngredientTemplate, removeIngredient } from "@/store/recipe/recipeFormSlice";

export default function IngredientsList(props: IngredientListProps) {
    const dispatch = useDispatch()
    const  list  = props.list

    //menu
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const [activeItem, setActiveIttem] = React.useState<string|null>(null)
    const selectItem = (e: React.MouseEvent<HTMLLIElement>): void => {
        const id =  e.currentTarget?.id ?? null;
        if (id) {
            setShowMenu(prev => !prev);
            setActiveIttem(id);
        };
    };

        //btn action
    const editItem = (): void => {
        if(activeItem) {
            dispatch(setIngredientTemplate({id: activeItem}));
        };
    };
    const removeItem = (): void => {
        if(activeItem) {
            dispatch(removeIngredient(activeItem));
        };
    };
    return (
        <ul className={styles.list}>
            {list.map(([id, ing], index) => {
                const {title, count, unit} = ing

                return (
                    <li key={id}  id={id} 
                        onClick={selectItem}
                        className={styles.listItem}>

                            <span className={styles.circle}>
                                {index+1}
                            </span> 
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
                            <span>
                                {title}
                            </span>

                            {count} {unit}

                   </li>
                )
            })}
        </ul>
    )
}   