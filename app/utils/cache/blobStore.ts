export interface IBlobStore {
    saveBlob: (id: string, blob: Blob) => void;
    notEmptyBlob: () => boolean;
    clearBlob: () => void;
    getBlob: (id: string) => Blob | undefined;
    hasBlob: (id: string) => boolean;
    deleteBlob: (id: string) => void;
};

export class BlobStore implements IBlobStore{
    #blobStore = new Map<string, Blob>();

    saveBlob(id: string, blob: Blob): void {
        this.#blobStore.set(id, blob)
    };

    notEmptyBlob(): boolean {
        return this.#blobStore.size !== 0;
    };

    clearBlob(): void {
        this.#blobStore.clear();
    };

    getBlob (id: string): Blob | undefined {
        return this.#blobStore.get(id);
    };

    hasBlob (id: string): boolean {
        return this.#blobStore.has(id);
    };

    deleteBlob(id: string): void {
        this.#blobStore.delete(id);
    } 
}