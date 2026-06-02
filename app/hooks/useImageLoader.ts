import React from "react"
import { blobStore } from "@/store/blob.store";

interface Img {
    url: string;
    type: string;
    name: string;
}

export default function useImageLoader() {

    const [loader, setLoader] = React.useState<boolean>(false);

    const loaderClose = () => setLoader(false);
    const loaderOpen = () => setLoader(true);
    
    const saveImage = (blob: Blob, name: string): Img => {

        blobStore.saveBlob(name, blob)

        const img: Img = {
            url: URL.createObjectURL(blob),
            type: blob.type,
            name: name
        }

        return img;
    };

    return {loader, loaderClose, loaderOpen, saveImage};
}