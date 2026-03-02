import { IStorageProvider } from '../models/IStorageProvider';
declare class StorageProviderInMemory implements IStorageProvider {
    private storage;
    saveFile(file: string, folder: string): Promise<string>;
    deleteFile(file: string, folder: string): Promise<void>;
}
export { StorageProviderInMemory };
//# sourceMappingURL=StorageProviderInMemory.d.ts.map