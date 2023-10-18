interface IPayload {
  sub: string
  email: string
}

interface ITokenProvider {
  encodeToken(
    data: string,
    secret: string,
    expiresIn: string | number,
  ): Promise<string>
  decodeToken(token: string): IPayload
}

export { ITokenProvider, IPayload }
