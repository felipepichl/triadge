import { IPayload, ITokenProvider } from '../models/ITokenProvider';
declare class TokenProviderInMemory implements ITokenProvider {
    encodeToken(payload: IPayload, _secret: string, _expiresIn: string | number): string;
    decodeToken(token: string, _secret: string): IPayload;
}
export { TokenProviderInMemory };
//# sourceMappingURL=TokenProviderInMemory.d.ts.map