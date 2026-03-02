import { Response } from 'express'

class CookieService {
  static setRefreshTokenCookie(response: Response, refreshToken: string): void {
    const cookieOptions = {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true,
    }

    response.cookie('refreshToken', refreshToken, cookieOptions)
  }
}

export { CookieService }
