import { authConfig } from '@config/auth'
import { Response } from 'express'

const isProduction = process.env.NODE_ENV === 'production'

class CookieService {
  static setRefreshTokenCookie(response: Response, refreshToken: string): void {
    const cookieOptions = {
      path: '/',
      secure: isProduction,
      httpOnly: true,
      sameSite: isProduction ? ('strict' as const) : ('lax' as const),
      maxAge: authConfig.expiresRefreshTokenDays * 24 * 60 * 60 * 1000,
    }

    response.cookie('refreshToken', refreshToken, cookieOptions)
  }
}

export { CookieService }
