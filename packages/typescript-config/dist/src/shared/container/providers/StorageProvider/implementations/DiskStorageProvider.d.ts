import { IStorageProvider } from '../models/IStorageProvider';
declare class DiskStorageProvider implements IStorageProvider {
    saveFile(file: string, folder: string): Promise<string>;
    deleteFile(file: string, folder: string): Promise<void>;
}
export { DiskStorageProvider };
//# sourceMappingURL=DiskStorageProvider.d.ts.map