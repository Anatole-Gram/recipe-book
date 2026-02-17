import React from "react";
import styles from "./recipeFormStep.module.scss"
import StepPhoto from "../../form-items/photo-input/PhotoInput";
import Description from "../../form-items/long-text-input/LongTextInput"


export default function RecipeFormStep (props: any) {

    const item = props.data
    const changeItem = props.setDataItem
    return (
        <fieldset  className={styles.formStep}>
            <StepPhoto className={styles.photo}/>
            <Description label="описание" name="description" value={item.description} handleChange={changeItem}/>
        </fieldset>
    )
}