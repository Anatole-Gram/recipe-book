import React from "react";
import styles from "./header-nav.module.scss";
import { Link } from "react-router-dom";


export default function HeaderNav() {

    return (
        <nav className={styles.nav}>
            <Link to={`/main`}>главная</Link>
            <Link to={`/recipe-form`}>новый рецепт</Link>
            <Link to={`/recipes`}>рецепты</Link>
        </nav>
    )
}