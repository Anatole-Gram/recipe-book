import React from "react";
import * as styles from './header.module.scss';

export default function TheHeader () {

    return (
        <div className={styles.header}>
            <h1>Recipe Book</h1>
        </div>
    );
}