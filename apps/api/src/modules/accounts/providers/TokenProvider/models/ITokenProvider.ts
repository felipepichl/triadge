interface IPayload {
  sub: string
  email: string
}

interface ITokenProvider {
  encodeToken(
    payload: IPayload,
    secret: string,
    expiresIn: string | number,
  ): string
  decodeToken(token: string, secret: string): IPayload
}

export { ITokenProvider, IPayload }
