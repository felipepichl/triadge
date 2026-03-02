import { IPayload, ITokenProvider } from '../models/ITokenProvider';
declare class JWTTokenProvider implements ITokenProvider {
    encodeToken(payload: IPayload, secret: string, expiresIn: string | number): string;
    decodeToken(token: string, secret: string): IPayload;
}
export { JWTTokenProvider };
//# sourceMappingURL=JWTTokenProvider.d.ts.map