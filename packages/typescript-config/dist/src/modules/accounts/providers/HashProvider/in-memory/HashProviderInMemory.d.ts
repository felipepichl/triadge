import { IHashProvider } from '../models/IHashProvider';
declare class HashProviderInMemory implements IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>;
}
export { HashProviderInMemory };
//# sourceMappingURL=HashProviderInMemory.d.ts.map