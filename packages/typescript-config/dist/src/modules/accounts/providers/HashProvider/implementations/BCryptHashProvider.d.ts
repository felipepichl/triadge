import { IHashProvider } from '../models/IHashProvider';
declare class BCryptHashProvider implements IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>;
}
export { BCryptHashProvider };
//# sourceMappingURL=BCryptHashProvider.d.ts.map