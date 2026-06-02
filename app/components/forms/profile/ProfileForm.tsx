import React from "react";
import styles from "./profile-form.module.scss";
import Input from "@/components/forms/form-items/common-input/CommonInput";
import type {ClassNamesCommonInput} from "@/components/forms/form-items/common-input/classNames";
import ImageLoader from "@/components/forms/form-items/image-loader/ImageLoader";
import  PhotoPreview from "@/components/forms/form-items/photo-preview/PhotoPreview";
import {ClassNamesPhotoInput} from "@/components/forms/form-items/photo-preview/classNames";
import { blobStore } from "@/store/blob.store";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {updateUserData} from "@/store/user/userThunks";
import {uploadImages} from "@/api/baseFetch";



type PofileFormProps = {
    data: {
        id: number;
        name: string;
        img: string;
    }
    closeEditor: () => void
}
interface Image {
    name: string;
    url: string;
}

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

export default function  ProfileForm({data, closeEditor}: PofileFormProps) {

    const dispatch = useDispatch<AppDispatch>();

    const imageName = `profile_${data.id}` as const;
    const [userName, setUserName] = React.useState<string>(data.name);
    const [image, setImage] = React.useState<Image>({name: imageName, url: data.img});
    const [imageLoader, setImageLoader] = React.useState<boolean>(false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUserName(e.target.value);
    }
    const handleBlop = (blob: Blob): void => {
        if(!blob) return;
        blobStore.saveBlob(image.name, blob)
        setImage(prev => ({...prev, url: URL.createObjectURL(blob)}));
        setImageLoader(false);
    };
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const thunkPayload = {id: data.id, name: userName, img: image.url};

        if(image.url !== data.img) {
            const resp = await uploadImages([image.name]);
            if(resp.status.ok) {
                thunkPayload.img = resp.images[0][1];
            };
        };

        await dispatch(updateUserData(thunkPayload)).unwrap()
            .then(closeEditor)
            .catch(err => console.log(err))
        

    }
    return (
        <form onSubmit={handleSubmit} className={styles.form}> 
            {imageLoader && <ImageLoader onCrop={handleBlop} close={() => setImageLoader(false)}/>}
            <PhotoPreview 
                url={image.url}
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
                        type="submit"
                        className={styles.menuBnt}>
                            Сохранить измененеия
                    </button>
                </li>
            </menu>
        </form>
    )
} 