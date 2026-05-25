import React from "react";
import styles from "./header-nav.module.scss";
import { NavLink } from "react-router-dom";


export default function HeaderNav() {

    return (
        <nav className={styles.nav}>

            <NavLink 
                to={`/main`} end
                className={({isActive}) => (isActive ? styles.active : undefined)}>
                    Главная
            </NavLink>

            <NavLink 
                to={`/recipe-form`} end
                className={({isActive}) => (isActive ? styles.active : undefined)}>
                    Новый рецепт
            </NavLink>

            <NavLink 
                to={`/recipes`} end
                className={({isActive}) => (isActive ? styles.active : undefined)}>
                    Рецепты
            </NavLink>

        </nav>
    )
}