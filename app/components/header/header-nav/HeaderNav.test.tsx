import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import HeaderNav from "@/components/header/header-nav/HeaderNav";

const MAIN_CLASS = 'header-main-link';
const RECIPE_CLASS = 'header-recipe-link';
const RECIPES_CLASS = 'header-recipes-link';

const ACTIVE_CLASS = /active/;

const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="current-path">{location.pathname}</div>
};

describe('HeaderNav', () => {
    it('корректно отображает ссылки меню навигации', async () => {
        render(
            <MemoryRouter>
                <HeaderNav />
            </MemoryRouter>
        );
        expect(screen.getByTestId(MAIN_CLASS)).toBeInTheDocument();
        expect(screen.getByTestId(RECIPE_CLASS)).toBeInTheDocument();
        expect( screen.getByTestId(RECIPES_CLASS)).toBeInTheDocument()
    });

    it('применяет активный класс к текущему маршруту', async () => {
        render(
            <MemoryRouter initialEntries={['/main']}>
                <HeaderNav />
                <Routes>
                    <Route path="/main" element={<LocationDisplay />} />
                    <Route path="/recipe-form" element={<LocationDisplay />} />
                    <Route path="/recipes" element={<LocationDisplay />} />
                    <Route path="*" element={<LocationDisplay />} />
                </Routes>
            </MemoryRouter>
        );

        const currentPath = screen.getByTestId('current-path');
        
        const mainLink = screen.getByTestId(MAIN_CLASS);
        const recipeLink = screen.getByTestId(RECIPE_CLASS);
        const recipesLink = screen.getByTestId(RECIPES_CLASS);

        expect(currentPath).toHaveTextContent('/main');
        expect(mainLink).toHaveClass(ACTIVE_CLASS);
        expect(recipeLink).not.toHaveClass(ACTIVE_CLASS);
        expect(recipesLink).not.toHaveClass(ACTIVE_CLASS);

        await userEvent.click(recipeLink);
        expect(currentPath).toHaveTextContent('/recipe-form');
        expect(mainLink).not.toHaveClass(ACTIVE_CLASS);
        expect(recipeLink).toHaveClass(ACTIVE_CLASS);
        expect(recipesLink).not.toHaveClass(ACTIVE_CLASS);
    });
});