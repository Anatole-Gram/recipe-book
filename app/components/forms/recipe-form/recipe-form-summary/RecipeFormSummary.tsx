import React from "react";
import styles from "./form-summary.module.scss"
import InputComponent from "@/components/forms/form-items/common-input/CommonInput";
import { dynamicLabel, ClassNamesCommonInput } from "@/components/forms/form-items/common-input/classNames"; //classNames для InputComponent.
import { smallColumn } from "@/components/forms/form-items/photo-preview/classNames"; ////classNames для RecipePhoto
import Categories from "@/components/forms/recipe-form/recipe-categories/RecipeCategories";
import type { RecipeSummary } from "@/store/store.types"
import classNamesExpander from "@/utils/classNames/expander";
import PhotoPreview from "@/components/forms/form-items/photo-preview/PhotoPreview";
import ImageLoader from "@/components/forms/form-items/image-loader/ImageLoader";


type  RecipeFormSummaryProps = {
    setDataItem: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    saveImage: (blob: Blob) => void
    summary: RecipeSummary;
};


export default function RecipeFormSummary({setDataItem: changeItem, summary, saveImage}: RecipeFormSummaryProps) {
    
    const { title, img, description } = summary;

    const [imageLoader, setImageLoader] = React.useState<boolean>(false);

    const handleBlop = (blob: Blob) => {
        saveImage(blob); 
        setImageLoader(false);
    }

    

    return(
        <fieldset className={styles.formSummary}>

            <InputComponent 
                label="название" 
                name="title" 
                value={title} 
                handleChange={changeItem} 
                classNames={ dynamicLabel }
            />
            
            <div className={styles.centralWraper}>

                <Categories className={styles.categories}/>

                <PhotoPreview 
                    btnText=""
                    label="фото рецепта"
                    url={img.url}
                    openLoader={() => {setImageLoader(true)}}
                    classNames={smallColumn}/>

            </div>

            <InputComponent 
                label="описание" 
                name="description" 
                value={description} 
                handleChange={changeItem} 
                textArea={true} 
                classNames={classNamesExpander<ClassNamesCommonInput>('input', `${styles.description}`, dynamicLabel)} />


            {imageLoader && <ImageLoader onCrop={handleBlop} close={() => {setImageLoader(false)}}/>}
            

        </fieldset>
    )
}