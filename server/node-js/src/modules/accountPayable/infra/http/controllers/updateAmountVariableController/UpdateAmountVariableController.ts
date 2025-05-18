import { UpdateAmountVariableUseCase } from '@modules/accountPayable/useCases/updateAmountVariableUseCase/UpdateAmountVariableUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateAmountVariableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { amount } = request.body
    const { id: accountPayableId } = request.params

    const useCase = container.resolve(UpdateAmountVariableUseCase)

    await useCase.execute({
      amount,
      accountPayableId,
    })

    return response.status(201).send()
  }
}

export { UpdateAmountVariableController }
