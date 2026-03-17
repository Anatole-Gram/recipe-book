import React from "react";
import styles from "./header.module.scss";
import Navigation from "./headre-nav/HeaderNav";

export default function TheHeader () {

    return (
        <div className={styles.header}>
            <h3>Recipe Book</h3>
            <Navigation />
        </div>
    );
}