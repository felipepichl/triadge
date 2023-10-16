import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserPartialUseCase } from '@modules/accounts/useCases/createUserPartial/CreateUserPartialUseCase'

class CreateUserPartialController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, phoneNumber } = request.body

    const createUserPartialUseCase = container.resolve(CreateUserPartialUseCase)

    await createUserPartialUseCase.execute({
      name,
      phoneNumber,
    })

    return response.status(201).send()
  }
}

export { CreateUserPartialController }
