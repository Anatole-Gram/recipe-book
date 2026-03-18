import React from "react";
import styles from "./user.module.scss";
import imgStub from "@/assets/images/recipe-img-stub.png"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

export default function UserProfile() {

    const user = useSelector((state: RootState) => state.user.data)


    return (
        <div className={styles.userCard}>

            <div className={styles.userCardHeader}></div>

            <img src={imgStub} alt="user photo"  width={150} height={150} className={styles.userCardImg}/>

            <div className={styles.userCardFooter}>
                <span className={styles.userName}> { user.name } </span>
                
                <div className={styles.userInfo}>
                    <span className={styles.userInfoRecipes}>мои рецепты: <span>0</span></span>

                    <span className={styles.userInfoRecipes}>на сайте с: <span>02.12.2025</span></span>
                </div>  
            </div>

        </div>
    )
}