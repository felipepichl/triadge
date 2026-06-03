import { RefreshTokenUseCase } from '@modules/accounts/useCases/refreshToken/RefreshTokenUseCase'
import { CookieService } from '@shared/services/CookiesServices'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = request.cookies?.refreshToken

    if (!token) {
      return response.status(401).json({ message: 'Refresh token not provided' })
    }

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

    const {
      token: newToken,
      refreshToken,
      user,
    } = await refreshTokenUseCase.execute({ token })

    CookieService.setRefreshTokenCookie(response, refreshToken)

    return response.json({
      user,
      token: newToken,
    })
  }
}

export { RefreshTokenController }
