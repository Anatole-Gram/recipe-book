import React from "react";
import styles from "./user.module.scss";
import imgStub from "@/assets/images/recipe-img-stub.png"

export default function UserProfile() {

    return (
        <div className={styles.userCard}>

            <div className={styles.userCardHeader}></div>

            <img src={imgStub} alt="user photo"  width={150} height={150} className={styles.userCardImg}/>

            <div className={styles.userCardFooter}>
                <span className={styles.userName}> User Name </span>
                
                <div className={styles.userInfo}>
                    <span className={styles.userInfoRecipes}>мои рецепты: <span>0</span></span>

                    <span className={styles.userInfoRecipes}>на сайте с: <span>02.12.2025</span></span>
                </div>  
            </div>

        </div>
    )
}