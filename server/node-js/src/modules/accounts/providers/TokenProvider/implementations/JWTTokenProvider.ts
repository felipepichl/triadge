import { sign, verify } from 'jsonwebtoken'
import { ITokenProvider, IPayload } from '../models/ITokenProvider'

class JWTTokenProvider implements ITokenProvider {
  encodeToken(payload: IPayload): string {
    return sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: process.env.EXPIRES_IN_TOKEN,
    })
  }

  decodeToken(token: string): IPayload {
    return verify(token, process.env.SECRET_TOKEN || '') as IPayload
  }
}

export { JWTTokenProvider }
