import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase'
import { CookieService } from '@shared/services/CookiesServices'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

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
