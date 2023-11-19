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

    const cookieOptions = {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true,
    }

    response.cookie('refreshToken', refreshToken, cookieOptions)

    return response.json(result)
  }
}

export { AuthenticateUserController }
