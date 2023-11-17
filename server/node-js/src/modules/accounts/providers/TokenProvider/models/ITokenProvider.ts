interface IPayload {
  sub: string
  email: string
}

interface ITokenProvider {
  encodeToken(payload: IPayload): string
  decodeToken(token: string): IPayload
}

export { ITokenProvider, IPayload }
