import { Response } from 'express'

const isProduction = process.env.NODE_ENV === 'production'

class CookieService {
  static setRefreshTokenCookie(response: Response, refreshToken: string): void {
    const cookieOptions = {
      path: '/',
      secure: isProduction,
      httpOnly: true,
      sameSite: isProduction ? ('strict' as const) : ('lax' as const),
    }

    response.cookie('refreshToken', refreshToken, cookieOptions)
  }
}

export { CookieService }
