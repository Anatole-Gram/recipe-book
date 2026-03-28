import React from "react";
import styles from "./header.module.scss";
import Navigation from "./headre-nav/HeaderNav";
import PetIcon from "@/assets/svg/pet.svg"

export default function TheHeader () {

    return (
        <div className={styles.header}>

            <div className={styles.wrapper}>
                <h3>Recipe book</h3>
                <PetIcon  className={styles.icon} />
            </div>
            
            <Navigation />
        </div>
    );
}