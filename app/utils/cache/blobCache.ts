
export class BlobStore {
    #blobStore = new Map<string, Blob>();

    saveBlob(id: string, blob: Blob): void {
        this.#blobStore.set(id, blob)
    };

    notEmptyBlob(): number {
        return this.#blobStore.size;
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

    evokeBlob(id: string): void {
        this.#blobStore.delete(id);
    } 
}