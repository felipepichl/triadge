import { sign, verify } from 'jsonwebtoken'

import { IPayload, ITokenProvider } from '../models/ITokenProvider'

class JWTTokenProvider implements ITokenProvider {
  encodeToken(
    payload: IPayload,
    secret: string,
    expiresIn: string | number,
  ): string {
    return sign(payload, secret, { expiresIn })
  }

  decodeToken(token: string, secret: string): IPayload {
    return verify(token, secret) as IPayload
  }
}

export { JWTTokenProvider }
