import React from "react";
import MenuPanel from "@/components/footer/footer-menu/FooterMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setRecipeIsActive } from "@/store/recipes/recipesSlice";
import { minMax } from "@/utils/base";

export default function RecipeCardMenu() {

    const dispatch = useDispatch();
    
    const recipeSectionId = useSelector((state: RootState) => state.recipes.recipeSectionId);
    let currentIndex: number = 0;
    const limits: number[] = [0, recipeSectionId.length]
    
    const scrolToAnchor = (index: number) => {
        currentIndex = minMax(index, limits)
        const el = document.getElementById((recipeSectionId[currentIndex]));
        if(el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const previousSection = () => {
        scrolToAnchor(--currentIndex)
        console.log(currentIndex)

    };
    const nextSection = () => {
        scrolToAnchor(++currentIndex)
    };

    const crossAction = () => {
        dispatch(setRecipeIsActive(false))
    }
    
return (
    <MenuPanel 
        back={{ action: previousSection, permission: true }}
        cross={{ action: crossAction, state: false }}
        next={{ action: nextSection, permission: true }}
    />
)
    
}