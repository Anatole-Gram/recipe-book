import React from "react";
import styles from "./recipes-filter-bar.module.scss";
import ToggleBtn from "@/components/buttons/ToggleBtn";
import SelectCategory from "@/components/forms/form-items/select/Select";
import AngleDown from "@/assets/svg/angle-down.svg";
import SearchInput from "@/components/forms/form-items/short-text-input/ShortTextInput";
import { simpleInput } from "@/components/forms/form-items/short-text-input/classNames" // classNames для SearchInput.
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { fetchRecipes } from "@/store/recipes/recipesThunks";
import { AppDispatch } from "@/store/store";


type RecipeFilterBarProps = {
    className?: string;
}
export default function RecipeFilterBar(props: RecipeFilterBarProps) {

    const {className} = props;
    const dispatch = useDispatch<AppDispatch>();


    //SelectCategory
    const {categories, list} = useSelector((state: RootState) => state.recipes)

    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const handleChangeCategories = (value: string[]): void => setSelectedCategories(value);
    const [showCategories, setShowCategories] = React.useState(false)


    //SearchInput
    const [searchValue, setSearchValue] = React.useState('');
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const value = e.target.value;
        setSearchValue(value);
    };

    // RadioToggle MyRecipes
    const [isMyRecipes, setIsMyRecipes] = React.useState<boolean>(false)
    const isMyRecipeToggle = (condition: boolean): void => setIsMyRecipes(condition);

    const urlForFiltredFetch = React.useMemo(() => {
        const params = new URLSearchParams();
        if(searchValue) {
            params.set('search', searchValue);
        };
        if(selectedCategories.length) {
            params.set('categories', selectedCategories.join(','));
        };
        const qryStr = params.toString()
        const url = `/api/recipes${qryStr ? '?'+qryStr : ''}`;
        return url
        
    }, [selectedCategories, searchValue]);

    const fetchFiltredRecipes = React.useCallback(() => {
        dispatch(fetchRecipes(urlForFiltredFetch))
    }, [urlForFiltredFetch])

    React.useEffect(() => {
        fetchFiltredRecipes();
    }, [selectedCategories, searchValue]);

    return (
        <form action="/recipes" method="GET" aria-label="фильтры рецептов" className={`${className} ${styles.filterBar}`}>

            <fieldset onClick={() => setShowCategories(!showCategories)} className={`${styles.categories}`}>
                <span>категория</span>
                <AngleDown   width="12"  height="12"/>
                <SelectCategory checkList={selectedCategories} options={categories} setValue={handleChangeCategories} display={showCategories} className={`${styles.categoriesSelect}`}/>
            </fieldset>
            

            <fieldset>
                <SearchInput name="search" placeholder="поиск" value={searchValue} handleChange={handleChangeSearch} classNames={simpleInput}/>
            </fieldset>

            <fieldset className={styles.ownRecipes}>
                <span className={styles.ownRecipesOwn}>мои</span>
                <ToggleBtn  action={isMyRecipeToggle} disabled={isMyRecipes} className={styles.ownRecipesBtn}/>
                <span>все</span>
            </fieldset>
        </form>
    )
}