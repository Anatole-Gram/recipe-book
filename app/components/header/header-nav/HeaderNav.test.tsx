import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import HeaderNav from "@/components/header/header-nav/HeaderNav";
import headerIds from "@/components/header/Header.selectors";

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
        expect(screen.getByTestId(headerIds.NAV_MAIN_LINK)).toBeInTheDocument();
        expect(screen.getByTestId(headerIds.NAV_RECIPE_LINK)).toBeInTheDocument();
        expect( screen.getByTestId(headerIds.NAV_RECIPES_LINK)).toBeInTheDocument()
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
        
        const mainLink = screen.getByTestId(headerIds.NAV_MAIN_LINK);
        const recipeLink = screen.getByTestId(headerIds.NAV_RECIPE_LINK);
        const recipesLink = screen.getByTestId(headerIds.NAV_RECIPES_LINK);

        expect(currentPath).toHaveTextContent('/main');
        expect(mainLink).toHaveClass(headerIds.NAV_ACTIVE);
        expect(recipeLink).not.toHaveClass(headerIds.NAV_ACTIVE);
        expect(recipesLink).not.toHaveClass(headerIds.NAV_ACTIVE);

        await userEvent.click(recipeLink);
        expect(currentPath).toHaveTextContent('/recipe-form');
        expect(mainLink).not.toHaveClass(headerIds.NAV_ACTIVE);
        expect(recipeLink).toHaveClass(headerIds.NAV_ACTIVE);
        expect(recipesLink).not.toHaveClass(headerIds.NAV_ACTIVE);
    });
});