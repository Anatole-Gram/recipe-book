import React from "react";
import styles from "./interactive-list.module.scss";
import {InteractiveListProps} from "@/components/forms/recipe-form/RecipeForm.types";
import ListItem from "./interactive-list-item/InteractiveListItem";
import AddStepBtn from "@/components/buttons/BigBlackBtn";


export default function InteractiveList(props: InteractiveListProps) {

    const {list, contentFn, remove, edite} = props;



    return (
        <>


            <ul className={styles.list}>
                {
                    list.map(([id, item], index) => {

                        const content = contentFn(item);

                        return (
                            <ListItem key={id} id={id} index={index} content={content} remove={remove} edite={edite}/>
                        )
                    })
                }
            </ul>
        </>
    )
}