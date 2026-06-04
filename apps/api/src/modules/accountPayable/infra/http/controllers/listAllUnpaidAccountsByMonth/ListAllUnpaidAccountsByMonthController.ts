import { ListAllUnpaidAccountsByMonthUseCase } from '@modules/accountPayable/useCases/listAllUnpaidAccountsByMonth/ListAllUnpaidAccountsByMonthUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllUnpaidAccountsByMonthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query
    const { id: userId } = request.user

    const listAllUnpaidAccountsByMonthUseCase = container.resolve(
      ListAllUnpaidAccountsByMonthUseCase,
    )

    const result = await listAllUnpaidAccountsByMonthUseCase.execute({
      userId,
      month: Number(month),
      year: year ? Number(year) : new Date().getFullYear(),
    })

    return response.status(200).json(result)
  }
}

export { ListAllUnpaidAccountsByMonthController }
