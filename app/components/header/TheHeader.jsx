import React from "react";
import styles from "./header.module.scss";
import Navigation from "./headre-nav/HeaderNav";
import PetIcon from "@/assets/svg/pet.svg"

export default function TheHeader () {

    return (
        <div className={styles.header + ` container`}>

            <div className={styles.headerLogo}>
                <span>Recipe book</span>
                <PetIcon  className={styles.icon} />
            </div>
            
            <Navigation />
        </div>
    );
}