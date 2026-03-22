import React from "react";
import StepPhoto from "@/components/forms/form-items/photo-input/PhotoInput";
import { regularColumn } from "@/components/forms/form-items/photo-input/classNames";
import  Input from "@/components/forms/form-items/common-input/CommonInput";
import { dynamicLabel, ClassNamesCommonInput } from "@/components/forms/form-items/common-input/classNames";
import classNamesExpander from "@/utils/classNames/expander";
import type { RecipeStep } from "@/store/recipe/recipeFormSlice.types";

type RecipeStepProps = {
    step:  RecipeStep;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function RecipeStep(props: RecipeStepProps) {

    const {step, handleChange} = props;
        
    return (

        <>
            <StepPhoto 
                title="Изображение"
                label="загрузить" 
                name="img" 
                value={step.img} 
                handleChange={handleChange} 
                classNames={regularColumn} />

            <Input 
                label="описание"
                name="description"
                value={step.description}
                textArea={true}
                handleChange={handleChange}
                classNames={classNamesExpander<ClassNamesCommonInput>('input', 'description', dynamicLabel)}/>
        </>
    )
}