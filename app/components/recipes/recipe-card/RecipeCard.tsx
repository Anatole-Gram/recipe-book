import React from "react";
import ExpandableCard from "@/components/cards/expandable-card/ExpandableCard";


type RecipeCadrProps = {
    action?: () => void;
    children: React.ReactNode;
    className?: string;
}
export default function RecipeCard(props: RecipeCadrProps) {
    const {action, children, className} = props;

    const items = React.useMemo(() => {
        return React.Children.toArray(children)
    }, [children])

    const [img = null, content = null]= items;

    return(
        <div onClick={action} className={`${className}`}>

            { img }

            <ExpandableCard>

                { content }

            </ExpandableCard>
        </div>
    )
}