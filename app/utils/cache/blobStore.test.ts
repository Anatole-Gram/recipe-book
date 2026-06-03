import { BlobStore, IBlobStore } from "./blobStore";

const testId =  'user-avatar-1';
const testContent = 'fake-image-data';
const testBlob = new Blob([testContent], {type: 'image/png'});

describe('BlobeStore', () => {
    let blobStore: IBlobStore;

    beforeEach(() => {
        blobStore = new BlobStore();
    });

    describe('saveBlob and getBlob', () => {
        it('должен сохранять blob и извлекать его по томуже id', () => {
            blobStore.saveBlob(testId, testBlob);
            const retrievedBlob = blobStore.getBlob(testId);
            expect(retrievedBlob).toBe(testBlob);
        });
        it('должен вренуть undefined при попытке получить несуществующий объект', () => {
            const retrievedBlob = blobStore.getBlob('non-existent-id');
            expect(retrievedBlob).toBeUndefined();
        });
    });

    describe('hasBlob', () => {
        it('должен венрнуть true, если blob существует', () => {
            blobStore.saveBlob(testId, testBlob);
            expect(blobStore.hasBlob(testId)).toBe(true);
        });
        it('должен вернуть false, если blob не существует', () => {
            expect(blobStore.hasBlob('non-exist-id')).toBe(false);
        });
    });

    describe('notEmptyBlob', () => {
        it('должен вернуть false, если blobeStore пустой', () => {
            expect(blobStore.notEmptyBlob()).toBe(false);
        });
        it('должен вернуть true, елси blobStore не пустой', () => {
            blobStore.saveBlob(testId, testBlob);
            expect(blobStore.notEmptyBlob()).toBe(true);
        });
    });

    describe('deleteBlob', () => {
        it('должен удалить blob по id', () => {
            const idToDelete = 'delete-me';
            const idToKeep = 'keep-me';

            blobStore.saveBlob(idToDelete, testBlob);
            blobStore.saveBlob(idToKeep, testBlob);

            blobStore.deleteBlob(idToDelete);

            expect(blobStore.hasBlob(idToDelete)).toBe(false);
            expect(blobStore.hasBlob(idToKeep)).toBe(true);
        });
    });
});