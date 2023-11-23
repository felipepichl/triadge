import { ITokenProvider, IPayload } from '../models/ITokenProvider'

class TokenProviderInMemory implements ITokenProvider {
  encodeToken(
    payload: IPayload,
    secret: string,
    expiresIn: string | number,
  ): string {
    return 'encodeToken'
  }

  decodeToken(token: string, secret: string): IPayload {
    return { sub: 'userId', email: 'user@example.com' }
  }
}

export { TokenProviderInMemory }
