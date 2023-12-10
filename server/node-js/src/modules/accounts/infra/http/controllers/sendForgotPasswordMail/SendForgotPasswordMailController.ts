import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { SendForgotPassordMail } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPassordMail'

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPassordMail,
    )

    await sendForgotPasswordMailUseCase.execute(email)

    return response.status(204).json()
  }
}

export { SendForgotPasswordMailController }
