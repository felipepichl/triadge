interface IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>;
}
export { IHashProvider };
//# sourceMappingURL=IHashProvider.d.ts.map