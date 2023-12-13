import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { SendForgotPassordMailUseCase } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPassordMailUseCase'

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPassordMailUseCase,
    )

    await sendForgotPasswordMailUseCase.execute(email)

    return response.status(204).json()
  }
}

export { SendForgotPasswordMailController }
