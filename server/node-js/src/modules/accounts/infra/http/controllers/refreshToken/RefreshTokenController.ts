import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { RefreshTokenUseCase } from '@modules/accounts/useCases/refreshToken/RefreshTokenUseCase'

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

    const { refreshToken } = await refreshTokenUseCase.execute({
      token: '',
    })

    return response.json(refreshToken)
  }
}

export { RefreshTokenController }
