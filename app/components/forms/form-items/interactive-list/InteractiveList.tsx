import React from "react";
import styles from "./interactive-list.module.scss";


import ListItem from "./interactive-list-item/InteractiveListItem";

export type ListItem<T> = [string, T];

export type InteractiveListProps<T> = {
  list: ListItem<T>[];
  contentFn: (item: T) => string;
  remove: (id: string) => void;
  edite: (id: string) => void;
};


export default function InteractiveList<T>(props: InteractiveListProps<T>) {

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