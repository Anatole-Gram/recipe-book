import React from "react";
import styles from "./recipe-form-ingredients.module.scss"
import Ingredient from "../../form-items/short-text-input/ShortTextInput";
import { dynamicLabel } from "@/components/forms/form-items/short-text-input/classNames"; //classNames для Ingredien.
import AddButton from "@/components/buttons/BigBlackBtn";
import {  RecipeIngredientsProps } from "../RecipeForm.types";
import { useDispatch } from "react-redux";
import { setIngredientTemplate, removeIngredient } from "@/store/recipe/recipeFormSlice";
import { RecipeIngredient } from "@/store/recipe/recipeFormSlice.types";
import IngredientList from "@/components/forms/form-items/interactive-list/InteractiveList";

 

export default function RecipeFormIngredients(props: RecipeIngredientsProps | any) {

    const {list, canSave} = props.data
    const item = props.data.item
    const changeItem = props.setDataItem
    const setList = props.setDataList

    const dispatch = useDispatch()

    //for list item
    const content = (item: any) => {
        return (
            `${item.title}`
        )
    };
    const remove = (id: string): void => {
        dispatch(removeIngredient(id));
    };
    
    const edite = (id: string): void => {
        dispatch(setIngredientTemplate({id: id}));
    };

    return (
        <fieldset className={styles.ingrredientsForm}>
            <div className={styles.inputWraper}>
                
                <Ingredient 
                    label="название" 
                    name="title"
                    value={item.title} 
                    handleChange={changeItem}
                    classNames={ dynamicLabel }/>
                
                <div className={`recipeFormInputWraper recipeFormShortInput ${styles.inputCount}`}>

                    <input 
                        type="number" 
                        aria-label="count"
                        placeholder=""
                        name="count"
                        value={item.count} 
                        onChange={changeItem}
                        id="count"/>

                    <label  
                        htmlFor="count"
                        className={styles.labe}>
                            кол-во
                    </label>

                </div>

                <div className={`recipeFormInputWraper recipeFormShortInput ${styles.inputUnit}`}>

                    <input 
                        type="text"
                        aria-placeholder="unit"
                        placeholder=""
                        name="unit"
                        value={item.unit} onChange={changeItem}
                        id="unit"
                        className={styles.input}/>

                    <label htmlFor="unit"
                        className={styles.label}>
                        ед. измерения
                    </label>

                </div>

                <AddButton btnText='добавить' action={setList} disabled={!canSave}
                    className={styles.inputBtn}
                    />
            </div>

            <IngredientList<RecipeIngredient> list={Object.entries(list)} contentFn={content} remove={remove} edite={edite}/>

        </fieldset>
    )
}