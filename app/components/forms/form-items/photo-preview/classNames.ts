import styles from "./photo-preview.module.scss";


export type  ClassNamesPhotoInput = {
    wrapper: string;
    img: string;
    label: string;
    btn: string;
};

export const smallColumn = {
    wrapper: `${styles.wrapper} ${styles.wrapperSmallColumn}`,
    img: `${styles.img} ${styles.imgSmallColumn}`,
    label: ` ${styles.label} ${styles.labelSmallColumn}`,
    btn: `${styles.btn}`
}

export const regularColumn = {
    wrapper: `${styles.wrapper} ${styles.wrapperRegular}`,
    img: `${styles.img} ${styles.labelRegular}`,
    label: ` ${styles.label} ${styles.labelRegular}`,
    btn: `${styles.btn}`
}