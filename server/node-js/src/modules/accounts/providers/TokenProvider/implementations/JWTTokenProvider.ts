import { sign, verify } from 'jsonwebtoken'
import { ITokenProvider, IPayload } from '../models/ITokenProvider'

class JWTTokenProvider implements ITokenProvider {
  async encodeToken(
    data: string,
    secret: string,
    expiresIn: string | number,
  ): Promise<string> {
    return sign(data, secret, { expiresIn })
  }

  decodeToken(token: string): IPayload {
    return verify(token, process.env.JWT_SECRET || '') as IPayload
  }
}

export { JWTTokenProvider }
