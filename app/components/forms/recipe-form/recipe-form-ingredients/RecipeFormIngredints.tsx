import React from "react";
import styles from "./recipe-form-ingredients.module.scss"
import ShortTextInput from "../../form-items/short-text-input/ShortTextInput";
import AddButton from "@/components/buttons/BigBlackBtn";
import { RecipeIngredientsProps } from "../RecipeForm.types";
import { RecipeIngredients } from "@/store/recipe/recipeFormSlice.types";


export default function RecipeFormIngredients(props: RecipeIngredientsProps | any) {

    const {list, canSave} = props.data
    const item = props.data.item
    const changeItem = props.setDataItem
    const setList = props.setDataList
    return (
        <fieldset className={styles.ingrredientsForm}>
            <div className={styles.inputWraper}>
                
                <ShortTextInput 
                    label="название" 
                    name="title"
                    value={item.title} 
                    handleChange={changeItem}
                    className={styles.inputTitle}/>
                
                <div className={`input-field ${styles.inputCount}`}>

                    <input 
                        type="number" 
                        aria-label="count"
                        placeholder=""
                        name="count"
                        value={item.count} 
                        onChange={changeItem}
                        id="count"
                        className={`input-field_input ${styles.input}`}/>

                    <label  
                        htmlFor="count"
                        className={`input-field_label ${styles.label}`}>
                            кол-во
                    </label>

                </div>

                <div className={`input-field ${styles.inputUnit}`}>

                    <input 
                        type="text"
                        aria-placeholder="unit"
                        placeholder=""
                        name="unit"
                        value={item.unit} onChange={changeItem}
                        id="unit"
                        className={`input-field_input ${styles.input}`}/>

                    <label htmlFor="unit"
                        className={`input-field_label ${styles.label}`}>
                        ед. измерения
                    </label>

                </div>

                <AddButton btnText='добавить' action={setList} disabled={!canSave}
                    className={styles.inputBtn}
                    />
            </div>
            <ul className={styles.list}>

                {Object.entries(list as RecipeIngredients).map(([id, ing], index) =>   {
                    const { title, count, unit} = ing
                    return (
                        <li key={id} className={styles.listItem}>

                            <span className={styles.circle}>
                                {index+1}
                            </span> 

                            <span>
                                {title}
                            </span>

                            {count} {unit}

                        </li>
                        );
                })}
 
            </ul>
        </fieldset>
    )
}