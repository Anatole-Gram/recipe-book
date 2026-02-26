import React from "react";
import styles from "./recipe-step.module.scss";
import StepPhoto from "@/components/forms/form-items/photo-input/PhotoInput";
import Description from "@/components/forms/form-items/long-text-input/LongTextInput";

export default function RecipeStep(props: any) {

    const {template, templateHandle} = props;
        
    return (

        <div  className={styles.formStep}>

            <StepPhoto className={styles.photo}/>
            <Description label="описание" name="description" value={template.description} handleChange={templateHandle}/>

        </div>

    )
}