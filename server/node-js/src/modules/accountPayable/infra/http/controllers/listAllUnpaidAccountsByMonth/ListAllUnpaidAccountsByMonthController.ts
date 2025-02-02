import { ListAllUnpaidAccountsByMonthUseCase } from '@modules/accountPayable/useCases/listAllUnpaidAccountsByMonth/ListAllUnpaidAccountsByMonthUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllUnpaidAccountsByMonthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month } = request.query
    const { id: userId } = request.user

    const listAllUnpaidAccountsByMonthUseCase = container.resolve(
      ListAllUnpaidAccountsByMonthUseCase,
    )

    const result = await listAllUnpaidAccountsByMonthUseCase.execute({
      userId,
      month: Number(month),
    })

    return response.status(200).json(result)
  }
}

export { ListAllUnpaidAccountsByMonthController }
