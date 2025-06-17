import { UpdateInterestPaidUseCase } from '@modules/accountPayable/useCases/updateInterestPaid/UpdateInterestPaidUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateInterestPaidController {
  async hanlde(request: Request, response: Response): Promise<Response> {
    const { amount } = request.body
    const { id: accountPayableId } = request.params

    const useCase = container.resolve(UpdateInterestPaidUseCase)

    await useCase.execute({
      amount,
      accountPayableId,
    })

    return response.status(201).send()
  }
}

export { UpdateInterestPaidController }
