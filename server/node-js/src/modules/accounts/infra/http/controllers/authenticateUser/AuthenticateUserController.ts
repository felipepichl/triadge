import { Request, Response } from 'express'
import { container } from 'tsyringe'

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

    AuthenticateUserController.setRefreshTokenCookie(response, refreshToken)

    return response.json({
      user,
      token,
    })
  }

  private static setRefreshTokenCookie(
    response: Response,
    refreshToken: string,
  ): void {
    const cookieOptions = {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true,
    }

    response.cookie('refreshToken', refreshToken, cookieOptions)
  }
}

export { AuthenticateUserController }
