import { ListAllUnfixedAccountsByMonthUseCase } from '@modules/accountPayable/useCases/listAllUnfixedAcountsByMonthUseCase/ListAllUnfixedAccountsByMonthUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllUnfixedAccountsByMonthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month } = request.query
    const { id: userId } = request.user

    const listAllUnfixedAccountsByMonthUseCase = container.resolve(
      ListAllUnfixedAccountsByMonthUseCase,
    )

    const result = await listAllUnfixedAccountsByMonthUseCase.execute({
      month: Number(month),
      userId,
    })

    return response.status(200).json(result)
  }
}

export { ListAllUnfixedAccountsByMonthController }
