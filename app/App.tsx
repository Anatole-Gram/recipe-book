import React from "react";
import TheHeader from "./components/header/TheHeader";
import TheContent from "./components/main-content/TheContent";
import TheFootrer from "./components/footer/TheFooter";
import { AppDispatch} from "app/store/store";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./store/recipes/recipesThunks";

export default function App() {

    const dispatch = useDispatch<AppDispatch>();

    //устанавливаем список категори рецептов
    React.useEffect(() => {
        dispatch(fetchCategories());
    },[]);

    return (
    <>
        <TheHeader></TheHeader>
        <TheContent></TheContent>
        <TheFootrer></TheFootrer>
    </>
)}
