import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CookieService } from '@shared/services/CookiesServices'

import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const { user, token, refreshToken } = await authenticateUserUseCase.execute(
      {
        email,
        password,
      },
    )

    CookieService.setRefreshTokenCookie(response, refreshToken)

    return response.json({
      user,
      token,
    })
  }
}

export { AuthenticateUserController }
