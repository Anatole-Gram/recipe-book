import React from "react";
import styles from "./header-nav.module.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


export default function HeaderNav(props: any) {

    return (
        <nav className={styles.nav}>
            <Link to={`/`}>главная</Link>
            <Link to={`/recipe-form`}>новый рецепт</Link>
            <Link to={`/recipes`}>рецепты</Link>
        </nav>
    )
}