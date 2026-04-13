import React from "react";
import styles from "./recipe-step.module.scss";
import Photopreview from "@/components/forms/form-items/photo-preview/PhotoPreview";
import { regularColumn } from "@/components/forms/form-items/photo-preview/classNames";
import  Input from "@/components/forms/form-items/common-input/CommonInput";
import { dynamicLabel, ClassNamesCommonInput } from "@/components/forms/form-items/common-input/classNames";
import classNamesExpander from "@/utils/classNames/expander";
import type { RecipeStep } from "@/store/store.types";
import ImageLoader from "@/components/forms/form-items/image-loader/ImageLoader";


type RecipeStepProps = {
    step:  RecipeStep;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    saveImage: (blob: Blob) => void;
};

export default function RecipeStep({step, handleChange, saveImage}: RecipeStepProps) {


    const [imageLoader, setImageLoader] = React.useState<boolean>(false)

    const handleBlop = (blob: Blob) => {
        saveImage(blob);
        setImageLoader(false);
    }

    return (

        <>
            <Photopreview 
                btnText="изменить изображение"
                label="фото шага" 
                url={step.img.url} 
                openLoader={() => {setImageLoader(true)}}
                classNames={regularColumn} />

            <Input 
                label="описание"
                name="description"
                value={step.description}
                textArea={true}
                handleChange={handleChange}
                classNames={classNamesExpander<ClassNamesCommonInput>('input', `${styles.description}`, dynamicLabel)}/>

            {imageLoader && <ImageLoader onCrop={handleBlop} close={() => {setImageLoader(false)}}/>}
        </>
    )
}