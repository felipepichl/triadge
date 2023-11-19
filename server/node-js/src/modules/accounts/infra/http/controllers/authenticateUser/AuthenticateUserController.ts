import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const result = await authenticateUserUseCase.execute({
      email,
      password,
    })

    const refreshToken = authenticateUserUseCase.generateRefreshToken()
    AuthenticateUserController.setRefreshTokenCookie(response, refreshToken)

    console.log('Controller => ', refreshToken)

    return response.json(result)
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
