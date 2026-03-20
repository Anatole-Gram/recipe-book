import React from "react";
import styles from "./recipe-step.module.scss";
import StepPhoto from "@/components/forms/form-items/photo-input/PhotoInput";
import { smallColumn } from "@/components/forms/form-items/photo-input/classNames";
import Description from "@/components/forms/form-items/long-text-input/LongTextInput";

export default function RecipeStep(props: any) {

    const {template, templateHandle} = props;
        
    return (

        <>
            <StepPhoto 
                label="изображение" 
                name="img" 
                value={template.img} 
                handleChange={()=> {}} 
                classNames={smallColumn} />

            <Description label="описание" name="description" value={template.description} handleChange={templateHandle} className={`recipeFormInputWraper recipeFormLongInput ${styles.formStepDescription}`}/>
        </>

    )
}