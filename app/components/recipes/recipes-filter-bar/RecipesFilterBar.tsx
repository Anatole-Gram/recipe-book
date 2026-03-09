import React from "react";
import styles from "./recipes-filter-bar.module.scss";
import ToggleBtn from "@/components/buttons/ToggleBtn";
import SelectCategory from "@/components/forms/form-items/select/Select";
import AngleDown from "@/assets/svg/angle-down.svg";
import SearchInput from "@/components/forms/form-items/short-text-input/ShortTextInput";



export default function RecipeFilterBar() {

    //SelectCategory
    const [categories, setCategories] = React.useState<string[]>([]);
    const handleChangeCategories = (value: string[]): void => setCategories(value);
    const options = [{label: 'первое', id: 'id1'}, {label: 'второе', id: 'id12'}, {label: 'салат', id: 'id123'}, {label: 'компот', id: 'id4'},];
    const [showCategories, setShowCategories] = React.useState(false)

    //SearchInput
    const [searchValue, setSearchValue] = React.useState('');
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchValue(value);
    };

    // RadioToggle MyRecipes
    const [isMyRecipes, setIsMyRecipes] = React.useState<boolean>(false)
    const isMyRecipeToggle = (condition: boolean): void => setIsMyRecipes(condition);

    React.useEffect(() => {
        console.log(`
            Categories: ${categories};
            SearchValue: ${searchValue};
            IsMyRecipes: ${isMyRecipes};`)
    })

    return (
        <form action="/recipes" method="GET" aria-label="фидьтры рецептов" className={styles.filterBar}>

            <fieldset onClick={() => setShowCategories(!showCategories)} className={`${styles.categories}`}>
                <span>категория</span>
                <AngleDown   width="12"  height="12"/>
                <SelectCategory checkList={categories} options={options} setValue={handleChangeCategories} display={showCategories} className={`${styles.categoriesSelect}`}/>
            </fieldset>
            

            <fieldset>
                <SearchInput name="search" placeholder="поиск" value={searchValue} handleChange={handleChangeSearch} className={styles.serchRecipes}/>
            </fieldset>

            <fieldset className={styles.ownRecipes}>
                <span className={styles.ownRecipesOwn}>мои</span>
                <ToggleBtn  action={isMyRecipeToggle} disabled={isMyRecipes} className={styles.ownRecipesBtn}/>
                <span>все</span>
            </fieldset>
        </form>
    )
}