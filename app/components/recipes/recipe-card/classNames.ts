import styles from "./recipe-card.module.scss";

export type ClassNamesRecipeCard = {
    wrapper: string;
    title: string;
    img: string;
    text: string;
}

export const recipeCardRegular: ClassNamesRecipeCard = {
    wrapper: `${styles.card}`,
    title: `${styles.cardTitle}`,
    img: `${styles.cardImg}`,
    text: `${styles.cardText}`,
}