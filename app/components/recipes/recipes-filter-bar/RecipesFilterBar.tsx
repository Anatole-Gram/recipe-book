import React from "react";
import styles from "./recipes-filter-bar.module.scss";
import ToggleBtn from "@/components/buttons/ToggleBtn";
import SelectCategory from "@/components/forms/form-items/select/Select";
import CommonBtn from "@/components/buttons/ButtonTemplate";
import AngleDown from "@/assets/svg/angle-down.svg";
import SearchInput from "@/components/forms/form-items/common-input/CommonInput";
import { simpleInput, ClassNamesCommonInput } from "@/components/forms/form-items/common-input/classNames" // classNames для SearchInput.
import { selectRegular, ClassNamesSelect } from "@/components/forms/form-items/select/classNames"; // classNames для SelectCategory
import classNamesExpander from "@/utils/classNames/expander";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchRecipes } from "@/store/recipes/recipesThunks";


type RecipeFilterBarProps = {
    className?: string;
}
export default function RecipeFilterBar(props: RecipeFilterBarProps) {

    const {className} = props;
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.data);

    //SelectCategory
    const {categories} = useSelector((state: RootState) => state.recipes)

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

    const urlForFiltredFetch = React.useMemo(() => {
        const params = new URLSearchParams();

        if(isMyRecipes) {
            params.set('authorId', user.id.toString());
        };
        if(searchValue) {
            params.set('search', searchValue);
        };
        if(selectedCategories.length) {
            params.set('categories', selectedCategories.join(','));
        };
        const qryStr = params.toString()
        const url = `/api/recipes${qryStr ? '?'+qryStr : ''}`;
        return url
        
    }, [selectedCategories, searchValue, isMyRecipes]);

    const fetchFiltredRecipes = React.useCallback(() => {
        dispatch(fetchRecipes(urlForFiltredFetch))
    }, [urlForFiltredFetch])

    React.useEffect(() => {
        fetchFiltredRecipes();
    }, [selectedCategories, searchValue, isMyRecipes]);

    return (
        <form action="/recipes" method="GET" aria-label="фильтры рецептов" className={`${className} ${styles.filterBar}`}>

            <fieldset className={`${styles.categories}`}>

                <CommonBtn 
                    btnText="категории"
                    action={() => setShowCategories(!showCategories)}
                    className={styles.categoriesBtn}/>

                <AngleDown  width="12"  height="12" fill="#1f1f1f"/>

                <SelectCategory 
                    checkList={selectedCategories} 
                    options={categories} 
                    setValue={handleChangeCategories} 
                    display={showCategories} 
                    classNames={classNamesExpander<ClassNamesSelect>('wrapper', `${styles.categoriesSelect}`, selectRegular)}/>

            </fieldset>
            

            <fieldset>

                <SearchInput 
                    name="search" 
                    placeholder="поиск" 
                    value={searchValue} 
                    handleChange={handleChangeSearch} 
                    classNames={classNamesExpander<ClassNamesCommonInput>('input', 'filter-bar_serch-input', simpleInput)}/>

            </fieldset>

            <fieldset className={styles.ownRecipes}>

                <span 
                    className={`${styles.ownRecipesOwn} ${!isMyRecipes ? styles.selected : styles.notSelected } ${styles.condition}`}>
                        все
                </span>

                <ToggleBtn  
                    action={setIsMyRecipes} 
                    disabled={isMyRecipes} 
                    className={styles.ownRecipesBtn}/>

                <span 
                    className={`${isMyRecipes ? styles.selected :styles.notSelected } ${styles.condition}`}>
                        мои
                </span>

            </fieldset>
        </form>
    )
}