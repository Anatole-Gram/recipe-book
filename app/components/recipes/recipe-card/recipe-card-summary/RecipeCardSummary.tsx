import React from "react";
import imgStub from "@/assets/images/recipe-img-stub.png";
import RecipeCard from "@/components/recipes/recipe-card/RecipeCard";
import { recipeCardRegular as classNames } from "@/components/recipes/recipe-card/classNames";

type RecipeCardSummaryProps = {
    title?: string;
    img?: string;
    description: string;
    showRecipe?: () => void;
}
export default function RecipeCardSummary(props: RecipeCardSummaryProps) {

    const { title, img, description, showRecipe} = props;

    return(

        <RecipeCard action={showRecipe} className={`${classNames.wrapper}`}>

            <img src={!img ? imgStub : img} alt="product image" width={100} height={100} className={classNames.img}/>

            <>
                <span className={classNames.title}>{title}</span>
                <p className={classNames.text}>{description}</p>
            </>
        </RecipeCard>

    )
}
