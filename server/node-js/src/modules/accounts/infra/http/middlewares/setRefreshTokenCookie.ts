import { Request, Response, NextFunction } from 'express'

function setRefreshTokenCookie(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { refreshToken } = request.params

  const cookieOptions = {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: true,
  }

  response.cookie('refreshToken', refreshToken, cookieOptions)

  next()
}

export { setRefreshTokenCookie }
