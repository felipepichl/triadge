import { RefreshTokenUseCase } from '@modules/accounts/useCases/refreshToken/RefreshTokenUseCase'
import { CookieService } from '@shared/services/CookiesServices'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = request.cookies.refreshToken

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

    const { refreshToken } = await refreshTokenUseCase.execute(token)

    CookieService.setRefreshTokenCookie(response, refreshToken)

    return response.status(201).send()
  }
}

export { RefreshTokenController }
