import React from "react";
import styles from "./user.module.scss";
import imgStub from "@/assets/images/recipe-img-stub.png"
import OutIcon from "@/assets/svg/bracket-solid.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { resetUserData } from "@/store/user/userSlice";
import { removeToken } from "@/utils/auth/authStorage"
import { useNavigate } from "react-router-dom";

export default function UserProfile() {

    const dispatch = useDispatch()
    const navigate =useNavigate()

    const user = useSelector((state: RootState) => state.user.data)
    const RecipesCount = user.recipeIds?.length ?? 0;

    const logOutt = () => {
        removeToken();
        dispatch(resetUserData());
        navigate('/login', {replace: true});
    };

    console.log(user)

    return (
        <div className={styles.userCard}>

            <button
                type="button"
                onClick={logOutt}
                className={styles.userOut}>
                    <OutIcon className={styles.userOutIcon}/>
            </button>

            <div className={styles.userCardHeader}></div>

            <img src={imgStub} alt="user photo"  width={150} height={150} className={styles.userCardImg}/>

            <div className={styles.userCardFooter}>
                <span className={styles.userName}> { user.name } </span>
                
                <div className={styles.userInfo}>
                    <span className={styles.userInfoRecipes}>мои рецепты: <span> {RecipesCount} </span></span>
                </div>  
            </div>

        </div>
    )
}