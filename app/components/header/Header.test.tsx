import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Header from "./Header";
import headerIds from "@/components/header/Header.selectors";
import { MemoryRouter } from "react-router-dom";

describe ('Header (интеграционный тест)', () => {
    it('собирает шапку и выводит навигациию', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        // 1. Проверяем обертку Header
        expect(screen.getByTestId(headerIds.HEADER)).toBeInTheDocument();

        // 2. Проверяем элементы логотипа (текст и иконку)
        expect(screen.getByText('Recipe book')).toBeInTheDocument();
        expect(screen.getByTestId(headerIds.ICON)).toBeInTheDocument();

        // 3. Интеграционная проверка: ищем одну ссылку из HeaderNav.
        expect(screen.getByTestId(headerIds.NAV_MAIN_LINK)).toBeInTheDocument();
    });
})
