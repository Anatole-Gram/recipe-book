import styles from "./photo-input.module.scss";


export type  ClassNamesPhotoInput = {
    wrapper: string;
    img: string;
    label: string;
    title: string;
};

export const smallColumn = {
    wrapper: `${styles.wrapper} ${styles.wrapperSmallColumn}`,
    img: `${styles.img}`,
    label: ` ${styles.label}`,
    title: `${styles.title} ${styles.SmallColumn}`
}

export const regularColumn = {
    wrapper: `${styles.wrapper} ${styles.wrapperRegular}`,
    img: `${styles.img} ${styles.labelRegular}`,
    label: ` ${styles.label}`,
    title: `${styles.title} ${styles.titleRegular}`
}