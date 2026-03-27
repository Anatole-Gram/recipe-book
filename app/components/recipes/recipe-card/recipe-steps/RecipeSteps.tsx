import React from "react";
import { useDispatch } from "react-redux";
import { setrecipeSectionId } from "@/store/recipes/recipesSlice";
import type { DBSteps } from "@/store/store.types";
import imgStub from "@/assets/images/recipe-img-stub.png";
import RecipeCard from "@/components/recipes/recipe-card/RecipeCard";
import { recipeCardRegular as classNames } from "@/components/recipes/recipe-card/classNames";

type RecipeStepsProps = {
    list: DBSteps;
    className?: string;
}


export default function RecipeSteps(props: RecipeStepsProps) {
    const dispatch = useDispatch();

    const {list, className} = props;
    const idList: string[] = []

    React.useEffect(() => {
        dispatch(setrecipeSectionId(idList))
    }, [])

    return (
        <div className={ `${className ?? ""}` }>
            <h5 className={''}> шаги рецепта </h5>
            
            {list.map(item => {
                const { description, img } = item;
                const id = `step-${item.id}`
                idList.push(id)

                return (
                    <RecipeCard key={id} className={classNames.wrapper}>
                        <img src={ !img ? imgStub : img } alt="stpe photo" width={100} height={100} className={ classNames.img}/>
                        <p className={ classNames.text }> { description } </p>
                    </RecipeCard>
                )
            })}
        </div>
    )
} 