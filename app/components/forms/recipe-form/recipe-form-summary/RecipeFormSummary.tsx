import React from "react";
import styles from "./form-summary.module.scss"
import RecipeName from "@/components/forms/form-items/short-text-input/ShortTextInput";
import RecipePhoto from "@/components/forms/form-items/photo-input/PhotoInput";
import RecipeDescription from "@/components/forms/form-items/long-text-input/LongTextInput";
import SelectCategory from "@/components/forms/form-items/singel-select/SingelSelect";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setSummaryTemplate } from "@/store/recipe/recipeFormSlice";
import {RecipeFormSummaryProps} from "../RecipeForm.types";
import  AngleDown from "@/assets/svg/angle-down.svg";



export default function RecipeFormSummary(props: RecipeFormSummaryProps | any) {
    const item =props.data 
    const changeItem = props.setDataItem

    const dispatch = useDispatch()

    const categories = useSelector((state: RootState) => state.recipes.categories);
    const [category, setCategory] = React.useState<{id: string, title: string}>({id: '0', title: 'Прочее'});
    const categorySelector = (id: string) => {
        const selected =  categories.find(cat => cat.id == id);
        setCategory(selected ?? {id: '1', title: 'Прочее'});
        dispatch(setSummaryTemplate({categoryId: id}));
    };
    
    const [showCategories, setShowCategories] = React.useState<boolean>(false);


    return(
        <fieldset className={styles.formSummary}>

            <RecipeName label="название" name="title" value={item.title} handleChange={changeItem}  className="recipeFormInputWraper recipeFormShortInput"/>
            
            <div className={styles.categories} onClick={() => setShowCategories(!showCategories)}>
                <span className={styles.categoryTitle}>категория рецепта:</span> 
                <div className={styles.category}> {category.title ?? ''}  <AngleDown width={12} height={12} />
                    <SelectCategory values={categories} handleChange={categorySelector} display={showCategories} className={styles.categoriesList}/>
                </div>
                
            </div>


            <RecipePhoto label="изображение" name="img" value={item.img} handleChange={changeItem} 
                className={styles.photo}/>
                
            <RecipeDescription label="описание" name="description" value={item.description} handleChange={changeItem} className="recipeFormInputWraper recipeFormLongInput"/>
        </fieldset>
    )
}