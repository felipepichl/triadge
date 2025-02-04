import { ListAllPaidAccountsByMonthUseCase } from '@modules/accountPayable/useCases/listAllPaidAccountsByMonthUseCase/ListAllPaidAccountsByMonthUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllPaidAccountsByMonthController {
  async handle(request: Request, response: Response) {
    const { month } = request.params
    const { id: userId } = request.user

    const useCase = container.resolve(ListAllPaidAccountsByMonthUseCase)

    const result = useCase.execute({
      userId,
      month: Number(month),
    })

    return response.status(200).json(result)
  }
}

export { ListAllPaidAccountsByMonthController }
