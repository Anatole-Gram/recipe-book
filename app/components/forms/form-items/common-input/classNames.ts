import styles from "./common-input.module.scss";

export type ClassNamesCommonInput = { wrapper?: string; input?: string, label?: string };

export const simpleInput: ClassNamesCommonInput = {
    wrapper: `${styles.wrapper}`, 
    input: `${styles.input}`, 
    label: `${styles.label}`
};

export const dynamicLabel: ClassNamesCommonInput = {
    wrapper: `${styles.wrapper} ${styles.wrapperDynamic}`, 
    input: `${styles.input}`, 
    label: `${styles.label} ${styles.labelDynamic}`
};