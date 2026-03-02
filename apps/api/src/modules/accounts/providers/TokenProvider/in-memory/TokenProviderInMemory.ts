import { IPayload, ITokenProvider } from '../models/ITokenProvider'

class TokenProviderInMemory implements ITokenProvider {
  encodeToken(
    payload: IPayload,
    _secret: string,
    _expiresIn: string | number,
  ): string {
    return `${Buffer.from(JSON.stringify(payload)).toString('base64')}`
  }

  decodeToken(token: string, _secret: string): IPayload {
    try {
      const [encodedPayload] = token.split('-')

      const decodedPayload = JSON.parse(
        Buffer.from(encodedPayload, 'base64').toString('ascii'),
      ) as IPayload

      return decodedPayload
    } catch {
      return { email: '', sub: '' }
    }
  }
}

export { TokenProviderInMemory }
