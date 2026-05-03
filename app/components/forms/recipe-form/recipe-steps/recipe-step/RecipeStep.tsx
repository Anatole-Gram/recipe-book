import React from "react";
import styles from "./recipe-step.module.scss";
import Photopreview from "@/components/forms/form-items/photo-preview/PhotoPreview";
import { regularColumn } from "@/components/forms/form-items/photo-preview/classNames";
import  Input from "@/components/forms/form-items/common-input/CommonInput";
import { dynamicLabel, ClassNamesCommonInput } from "@/components/forms/form-items/common-input/classNames";
import classNamesExpander from "@/utils/classNames/expander";
import type { RecipeStep } from "@/store/store.types";
import ImageLoader from "@/components/forms/form-items/image-loader/ImageLoader";
import useImageLoader from "@/hooks/useImageLoader";
import { useDispatch } from "react-redux";
import {setStepTemplate } from "@/store/recipe/recipeFormSlice";


type RecipeStepProps = {
    recipeStep:  RecipeStep;
    numberStep: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function RecipeStep({recipeStep, numberStep, handleChange}: RecipeStepProps) {

    const dispatch = useDispatch()
    const {loader, loaderOpen, loaderClose, saveImage} = useImageLoader();


    const handleBlop = (blob: Blob) => {
        const name = recipeStep?.id ?? `id-${numberStep}`;
        const img = saveImage(blob, name);
        dispatch(setStepTemplate({id: name, img}));
        loaderClose();
    }

    return (

        <>
            <Photopreview 
                btnText="изменить изображение"
                label="фото шага" 
                url={recipeStep.img.url} 
                openLoader={loaderOpen}
                classNames={regularColumn} />

            <Input 
                label="описание"
                name="description"
                value={recipeStep.description}
                textArea={true}
                handleChange={handleChange}
                classNames={classNamesExpander<ClassNamesCommonInput>('input', `${styles.description}`, dynamicLabel)}/>

            {loader && <ImageLoader onCrop={handleBlop} close={loaderClose}/>}
        </>
    )
}