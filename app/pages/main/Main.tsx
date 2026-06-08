import React, { useEffect } from "react";
import styles from "./main.module.scss";
import imgStub from "@/assets/images/recipe-img-stub.png";
import OutIcon from "@/assets/svg/bracket-solid.svg";
import Edit from "@/assets/svg/pen-to-square-solid.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setUserData } from "@/store/user/userThunks";
import { resetUserData } from "@/store/user/userSlice";
import { removeToken } from "@/utils/auth/authStorage"
import { useNavigate } from "react-router-dom";
import ProfileForm from "@/components/forms/profile/ProfileForm";
import { toRelative } from "@/utils/base";

export default function Main() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate =useNavigate()

    const user = useSelector((state: RootState) => state.user.data);
    const RecipesCount = user.recipeIds?.length ?? 'нет данных';

    const [profileEditor, setProfileEditor] = React.useState<boolean>(false);

    const logOutt = () => {
        removeToken();
        dispatch(resetUserData());
        navigate('/login', {replace: true});
    };



    useEffect(() => {
        dispatch(setUserData(user.id))
    }, [])

    return (
        <>
        {profileEditor && <ProfileForm data={{id: user.id, name: user.name, img: user.img ? toRelative(user.img) : imgStub}} closeEditor={() => setProfileEditor(false)}/>}
        {!profileEditor && 
        <div className={styles.userCard}>
            <menu className={styles.menu}>
                <li>
                    <button
                        type="button"
                        onClick={() => setProfileEditor(true)}
                        className={`${styles.menuBtn} ${styles.menuEdit}`}>
                            <Edit className={styles.menuIcon}/>
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={logOutt}
                        className={`${styles.menuBtn} ${styles.menuOut}`}>
                            <OutIcon className={styles.menuIcon}/>
                    </button>
                </li>
            </menu>

            <div className={styles.userCardHeader}></div>

            <img src={toRelative(user.img ?? imgStub)} alt="user photo"  width={150} height={150} className={styles.userCardImg}/>

            <div className={styles.userCardFooter}>
                <span className={styles.userName}> { user.name } </span>
                
                <div className={styles.userInfo}>
                    <span className={styles.userInfoRecipes}>мои рецепты: <span> {RecipesCount} </span></span>
                </div>  
            </div>

        </div>}
        </>
    )
}