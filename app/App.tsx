import React from "react";
import Header from "./components/header/Header";
// import TheContent from "./components/main-content/TheContent";
import AppRoutes from "./routes";
import TheFootrer from "./components/footer/TheFooter";
import { AppDispatch, RootState } from "app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./store/recipes/recipesThunks";
import { setUserData } from "@/store/user/userThunks";
import { getToken } from "@/utils/auth/authStorage";
import type { Categories, DBUser } from "./store/store.types";
import { setAuthInitialized } from "./store/user/userSlice";


export default function App() {

    const dispatch = useDispatch<AppDispatch>();

    const {authInitialized} = useSelector((state: RootState) => state.user)

    React.useEffect(() => {
        const init = async () => {
            const token = getToken();

            const promises: Array<Promise<Categories | DBUser>> = [dispatch(fetchCategories()).unwrap()];
            if(token) {
                promises.push(dispatch(setUserData(+token)).unwrap());
            }

            await Promise.all(promises)
                .then(data => {console.log(data)})
                .catch(err => {console.log(err)})
            dispatch(setAuthInitialized(true))
        };
        init()
    },[dispatch]);
    

    if(!authInitialized) {
        return <></>
    }
    return (
    <>
        <Header />

        <section className="container content">
            <AppRoutes />
        </section>

        <TheFootrer />
    </>
)}
