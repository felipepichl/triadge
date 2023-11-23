import { ITokenProvider, IPayload } from '../models/ITokenProvider'

class TokenProviderInMemory implements ITokenProvider {
  encodeToken(
    payload: IPayload,
    secret: string,
    expiresIn: string | number,
  ): string {
    const fakeToken = `${payload.sub}.${secret}-${expiresIn}`

    console.log('fake => ', fakeToken)
    return Buffer.from(JSON.stringify(fakeToken)).toString('base64')
  }

  decodeToken(token: string, secret: string): IPayload {
    console.log('Decoded => ', token, secret)

    return JSON.parse(
      Buffer.from(`${token}.${secret}`, 'base64').toString('ascii'),
    )
  }
}

export { TokenProviderInMemory }
