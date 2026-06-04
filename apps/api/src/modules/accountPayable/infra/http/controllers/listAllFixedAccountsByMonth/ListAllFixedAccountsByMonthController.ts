import { ListAllFixedAccountsByMonthUseCase } from '@modules/accountPayable/useCases/listAllFixedAccountsByMonth/ListAllFixedAccountsByMonthUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllFixedAccountsByMonthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query
    const { id: userId } = request.user

    const listAllFixedAccountsByMonthUseCase = container.resolve(
      ListAllFixedAccountsByMonthUseCase,
    )

    const result = await listAllFixedAccountsByMonthUseCase.execute({
      month: Number(month),
      year: year ? Number(year) : new Date().getFullYear(),
      userId,
    })

    return response.status(200).json(result)
  }
}

export { ListAllFixedAccountsByMonthController }
