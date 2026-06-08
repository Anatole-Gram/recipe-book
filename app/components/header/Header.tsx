import React from "react";
import styles from "./header.module.scss";
import Navigation from "./header-nav/HeaderNav";
import PetIcon from "@/assets/svg/pet.svg"
import headerIds from "@/components/header/Header.selectors";
export default function TheHeader () {

    return (
        <div className={styles.header} data-testid={headerIds.HEADER}>
            
            <div className={styles.headerContainer + ` container`}>

                <div className={styles.headerLogo}>
                    <span data-testid={headerIds.ICON}>Recipe book</span>
                    <PetIcon  className={styles.icon} />
                </div>
            
                <Navigation />

            </div>

        </div>
    );
}