import React from "react";
import styles from "./recipe-categories.module.scss"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import SelectCategory from "@/components/forms/form-items/singel-select/SingelSelect";
import { setSummaryTemplate } from "@/store/recipe/recipeFormSlice";
import  AngleDown from "@/assets/svg/angle-down.svg";

type RecipeCategoriesProps = {
    className?: string;
}

export default function RecipeCategories({className}: RecipeCategoriesProps) {
    
    const dispatch = useDispatch()

    const categories = useSelector((state: RootState) => state.recipes.categories);

    const [category, setCategory] = React.useState<{id: string, title: string}>({id: '1', title: 'Прочее'});

    const categorySelector = (id: string) => {
        const selected =  categories.find(cat => cat.id == id);
        setCategory(selected ?? {id: '1', title: 'Прочее'});
        dispatch(setSummaryTemplate({categoryId: id}));
    };

    const [showCategories, setShowCategories] = React.useState<boolean>(false);

    return (
        <div className={`${styles.categories} ${className ?? ''}`} >


            <div className={styles.categoriesWrapper}>

                <label  
                    htmlFor="category-btn"
                    className={styles.categoriesTitle}>
                        категория рецепта
                </label>

                <button
                    type="button"
                    onClick={() => setShowCategories(!showCategories)}
                    id="category-btn"
                    className={`${styles.selectedCtegory}`}>

                        {category.title ?? 'не выбрана'}
                        <AngleDown width={10} height={10}/>

                </button>

                <SelectCategory 
                    values={categories} 
                    handleChange={categorySelector} 
                    selectedDefault={category.id}
                    display={showCategories} 
                    className={styles.categoriesList} />

            </div>


        </div>
    )
}