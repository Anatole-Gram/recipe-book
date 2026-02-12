import React from "react";
import styles from "./form-summary.module.scss"
import RecipeName from "../../form-items/short-text-input/ShortTextInput";
import RecipePhoto from "../../form-items/photo-input/PhotoInput";
import RecipeDescription from "../../form-items/long-text-input/LongTextInput";
import {RecipeFormSummaryProps} from "../RecipeForm.types"


export default function RecipeFormSummary(props: RecipeFormSummaryProps | any) {
    const item =props.data
    const changeItem = props.setDataItem

    return(
        <fieldset className={styles.formSummary}>
            <RecipeName label="название" name="title" value={item.title} handleChange={changeItem} />
            <RecipePhoto label="изображение" name="img" value={item.img} handleChange={changeItem} />
            <RecipeDescription label="описание" name="description" value={item.description} handleChange={changeItem} />
        </fieldset>
    )
}