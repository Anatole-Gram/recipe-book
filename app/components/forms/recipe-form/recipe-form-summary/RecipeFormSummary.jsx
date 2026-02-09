import React from "react";
import styles from "./form-summary.module.scss"
import ShortTextInput from "../../form-items/short-text-input/ShortTextInput";
import PhotoInput from "../../form-items/photo-input/PhotoInput";
import LongTextInput from "../../form-items/long-text-input/LongTextInput";


export default function RecipeFormSummary(props) {



    return(
        <fieldset className={styles.formSummary}>
            <ShortTextInput label="название" value={props.data.title} handleChange={props.setData} name="title"/>
            <PhotoInput label="изображение" value={props.data.img} handleChange={props.setData} name="img"/>
            <LongTextInput label="описание" value={props.data.description} handleChange={props.setData} name="description"/>
        </fieldset>
    )
}