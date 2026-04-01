

const blobStore = new Map<string, Blob>();

export function saveBlob(id: string, blob: Blob) {
    blobStore.set(id, blob);
};

export function getBlob (id: string): Blob | undefined {
    return blobStore.get(id);
};

export function hasBlob (id: string): boolean {
    return blobStore.has(id);
}

export function revokeBlob(id: string) {
    blobStore.delete(id)
} 