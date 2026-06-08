import React from "react";
import styles from "./header-nav.module.scss";
import headerIds from "@/components/header/Header.selectors";
import { NavLink } from "react-router-dom";

export default function HeaderNav() {

    return (
        <nav className={styles.nav}>

            <NavLink 
                to={`/main`} end
                className={({isActive}) => (isActive ? styles.active : undefined)}
                data-testid={headerIds.NAV_MAIN_LINK}>
                    Главная
            </NavLink>

            <NavLink 
                to={`/recipe-form`} end
                className={({isActive}) => (isActive ? styles.active : undefined)}
                data-testid={headerIds.NAV_RECIPE_LINK}>
                    Новый рецепт
            </NavLink>

            <NavLink 
                to={`/recipes`} end
                className={({isActive}) => (isActive ? styles.active : undefined)}
                data-testid={headerIds.NAV_RECIPES_LINK}>
                    Рецепты
            </NavLink>

        </nav>
    )
}