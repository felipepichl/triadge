import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAllUseCase } from '@modules/accounts/useCases/listAll/ListAllUseCase'

class ListAllController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllUseCase = container.resolve(ListAllUseCase)

    const result = await listAllUseCase.execute()

    return response.status(200).json(result)
  }
}

export { ListAllController }
