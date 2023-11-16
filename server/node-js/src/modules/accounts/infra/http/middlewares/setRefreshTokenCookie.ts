import { Request, Response, NextFunction } from 'express'
import { sign } from 'jsonwebtoken'

import { authConfig } from '@config/auth'

function setRefreshTokenCookie(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { secretRefreshToken, expiresInRefreshToken } = authConfig

  const { user } = request
  console.log('RefreshToken => ', user)

  const { email } = user

  const refreshToken = sign({ email }, secretRefreshToken, {
    subject: user.id.toString(),
    expiresIn: expiresInRefreshToken,
  })

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
