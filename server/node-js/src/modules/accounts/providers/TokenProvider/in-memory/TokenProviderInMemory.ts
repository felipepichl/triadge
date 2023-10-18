import { ITokenProvider, IPayload } from '../models/ITokenProvider'

class TokenProviderInMemory implements ITokenProvider {
  async encodeToken(
    data: string,
    secret: string,
    expiresIn: string | number,
  ): Promise<string> {
    const fakeToken = `${data}.${secret}-${expiresIn}`
    return Buffer.from(JSON.stringify(fakeToken)).toString('base64')
  }

  decodeToken(token: string): IPayload {
    return JSON.parse(Buffer.from(token, 'base64').toString('ascii'))
  }
}

export { TokenProviderInMemory }
