import React from "react";
import styles from "./form-summary.module.scss"
import InputComponent from "@/components/forms/form-items/common-input/CommonInput";
import { dynamicLabel, ClassNamesCommonInput } from "@/components/forms/form-items/common-input/classNames"; //classNames для InputComponent.
import { smallColumn } from "@/components/forms/form-items/photo-preview/classNames"; ////classNames для RecipePhoto
import Categories from "@/components/forms/recipe-form/recipe-categories/RecipeCategories";
import classNamesExpander from "@/utils/classNames/expander";
import PhotoPreview from "@/components/forms/form-items/photo-preview/PhotoPreview";
import ImageLoader from "@/components/forms/form-items/image-loader/ImageLoader";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {setSummaryTemplate, setValid} from "@/store/recipe/recipeFormSlice";
import {validateSummary} from "@/utils/validation/RecipeFormValidators";
import useImageLoader from "@/hooks/useImageLoader";


export default function RecipeFormSummary() {
    
    const dispatch = useDispatch();
    const summary = useSelector((state: RootState) => state.recipeForm.recipe[0]);
    const  template = useSelector((state: RootState) => state.recipeForm.summaryTemplate);
    const {loader, loaderOpen, loaderClose, saveImage} = useImageLoader();

    //проверяем пустой ли summary в recipe, если нет устанавливаем его в шаблон
    React.useEffect(() => {
        if(Object.keys(summary).length) {
            dispatch(setSummaryTemplate(summary))
        }
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target; 
        dispatch(setSummaryTemplate({[name]: value}))
    };

    const validSummary = validateSummary(template);
    React.useEffect(() => { dispatch(setValid({summary: validSummary.valid}));}, [validSummary]);

    const handleBlop = (blob: Blob) => {
        const name: string = 'summary';
        const img = saveImage(blob, name);
        dispatch(setSummaryTemplate({id: name, img}));
        loaderClose();
    };

    

    return(
        <fieldset className={styles.formSummary}>

            {loader && <ImageLoader onCrop={handleBlop} close={loaderClose}/>}

            <InputComponent 
                label="название" 
                name="title" 
                value={template.title} 
                handleChange={handleChange} 
                classNames={ dynamicLabel }/>
            
            <div className={styles.centralWraper}>

                <Categories className={styles.categories}/>

                <PhotoPreview 
                    btnText=""
                    label="фото рецепта"
                    url={template.img.url}
                    openLoader={loaderOpen}
                    classNames={smallColumn}/>

            </div>

            <InputComponent 
                label="описание" 
                name="description" 
                value={template.description} 
                handleChange={handleChange} 
                textArea={true} 
                classNames={classNamesExpander<ClassNamesCommonInput>('input', `${styles.description}`, dynamicLabel)} />

        </fieldset>
    )
}