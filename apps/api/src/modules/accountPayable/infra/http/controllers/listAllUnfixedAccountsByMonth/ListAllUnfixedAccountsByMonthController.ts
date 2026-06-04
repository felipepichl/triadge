import { ListAllUnfixedAccountsByMonthUseCase } from '@modules/accountPayable/useCases/listAllUnfixedAcountsByMonthUseCase/ListAllUnfixedAccountsByMonthUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllUnfixedAccountsByMonthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query
    const { id: userId } = request.user

    const listAllUnfixedAccountsByMonthUseCase = container.resolve(
      ListAllUnfixedAccountsByMonthUseCase,
    )

    const result = await listAllUnfixedAccountsByMonthUseCase.execute({
      month: Number(month),
      year: year ? Number(year) : new Date().getFullYear(),
      userId,
    })

    return response.status(200).json(result)
  }
}

export { ListAllUnfixedAccountsByMonthController }
