interface IStorageProvider {
    saveFile(file: string, folder: string): Promise<string>;
    deleteFile(file: string, folder: string): Promise<void>;
}
export { IStorageProvider };
//# sourceMappingURL=IStorageProvider.d.ts.map