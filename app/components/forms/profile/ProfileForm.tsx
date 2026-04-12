import React from "react";
import styles from "./profile-form.module.scss";
import Input from "@/components/forms/form-items/common-input/CommonInput";
import type {ClassNamesCommonInput} from "@/components/forms/form-items/common-input/classNames";
import ImageLoader from "@/components/forms/form-items/image-loader/ImageLoader";
import  PhotoPreview from "@/components/forms/form-items/photo-preview/PhotoPreview";
import {profilePreview, ClassNamesPhotoInput} from "@/components/forms/form-items/photo-preview/classNames";
import {saveBlob} from "@/utils/cache/blobCache";

const INPUT_CLASS_NAMES:ClassNamesCommonInput  = {
    wrapper: `${styles.inputWrapper} ${styles.box}`,
    input: styles.input,
    label: styles.inputLabel
};

const PREVIEW_CLASS_NAMES: ClassNamesPhotoInput = {
    wrapper: `${styles.prevWrapper}`,
    img: `${styles.prevImg}`,
    label: `${styles.prevLabel}`,
    btn: `${styles.prevBtn} ${styles.box}`
}

type PofileFormProps = {
    data: {
        id: number;
        name: string;
        img: string | null;
    }
    closeEditor: () => void
}
export default function  ProfileForm({data, closeEditor}: PofileFormProps) {
    
    React.useEffect(() => {

    }, []);

    const [userName, setUserName] = React.useState<string>(data.name);
    const [image, setImage] = React.useState<string | null>(data.img);
    const [imageLoader, setImageLoader] = React.useState<boolean>(false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUserName(e.target.value);
    }
    const handleBlop = (blob: Blob): void => {
        saveBlob('userImage', blob);
        setImageLoader(false);
    };
    return (
        <form className={styles.form}> 
            {imageLoader && <ImageLoader onCrop={handleBlop} close={() => setImageLoader(false)}/>}
            <PhotoPreview 
                url={image ?? ''}
                btnText="Загрузить изображение"
                openLoader={() => setImageLoader(true)} 
                classNames={PREVIEW_CLASS_NAMES}
                />
            
            <Input 
                name="userName" 
                value={userName} 
                label="Имя пользователя"
                handleChange={handleInput} 
                classNames={INPUT_CLASS_NAMES}
                />
            <menu className={styles.menu}>
                <li>
                    <button
                        onClick={closeEditor}
                        type="button"
                        className={styles.menuBnt}>
                            Закрыть редактор
                    </button>
                </li>
                <li>
                    <button 
                        type="button"
                        className={styles.menuBnt}>
                            Сохранить измененеия
                    </button>
                </li>
            </menu>
        </form>
    )
} 