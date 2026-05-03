
import { getBlob } from "@/utils/cache/blobCache";



interface ReturnData {
    status: {
        ok: boolean;
        error: string | null;
    };
    images: [name: string, url: string][];
}

export async function uploadImages(blobNames: string[]): Promise<ReturnData> {

    const data: ReturnData = {
        status: {
            ok: false,
            error: null
        },
        images: []
    }
    const formData = new FormData();

    for(let i = 0; i < blobNames.length; i++) {
        const blob = getBlob(blobNames[i]);
        if(!blob) continue;
        formData.append('files', blob, blobNames[i]);
    };

    const response = await fetch('/api/upload/images', {
        method: 'POST',
        body: formData
    });

    if(!response.ok) {
        data.status.error = await response.text();
        return data;
    }

    data.images = await response.json();
    data.status.ok = data.images.length > 0;
    
    return data;
}