import React from "react";
import type { ClassNamesPhotoInput } from "./classNames";
import imageStub from "@/assets/images/recipe-img-stub.png";


type PhotoPreviewProps = {
    openLoader: () => void;
    url: string;
    label?: string; 
    btnText?: string; 
    classNames?: ClassNamesPhotoInput;
}

export default function PhotoPreview(props: PhotoPreviewProps) {

const {url , label, btnText, openLoader, classNames} = props;

    return(
        <div className={classNames?.wrapper ?? ''}>

            <label 
                className={classNames?.label}>
                    {`${label ? label : 'изображение'}`}  
            </label>

            <button 
            type="button"
                onClick={openLoader}
                className={classNames?.btn ?? ''}> 
                {btnText ? btnText : 'изменить'}
            </button>

            <img src={url || imageStub} alt="#" width={150} height={150} className={classNames?.img} /> 

        </div>
    )
}