import { Request, Response, NextFunction } from 'express'
import { sign } from 'jsonwebtoken'

import { authConfig } from '@config/auth'

function setRefreshTokenCookieMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { secretRefreshToken, expiresInRefreshToken, expiresRefreshTokenDays } =
    authConfig

  const { user } = request
  const { email } = user

  const refreshToken = sign({ email }, secretRefreshToken, {
    subject: user.id.toString(),
    expiresIn: expiresInRefreshToken,
  })

  const refreshTokenExpiresDate = this.dateProvider.addDays(
    expiresRefreshTokenDays,
  )

  const cookieOptions = {
    httpOnly: true,
    expires: refreshTokenExpiresDate,
    secure: true,
    sameSite: true,
  }

  response.cookie('refreshToken', refreshToken, cookieOptions)

  next()
}

export { setRefreshTokenCookieMiddleware }
