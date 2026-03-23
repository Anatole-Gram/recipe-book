import styles from "./select.module.scss";

export type ClassNamesSelect = {
    wrapper: string;
    wrapperHide: string;
    title: string;
    label: string;
    labelSelected: string;
    wrapperMenu: string;
    selectAll: string;
    reset: string;
};

export const selectRegular = {
    wrapper: `${styles.wrapper}`,
    wrapperHide: `${styles.wrapperHide}`, 
    title: `${styles.title}`, 
    label: `${styles.label}`, 
    labelSelected: `${styles.labelSelect}`, 
    wrapperMenu: `${styles.wrapperMenu}`,
    selectAll: `${styles.selectAll}`,
    reset: `${styles.reset}`, 
}