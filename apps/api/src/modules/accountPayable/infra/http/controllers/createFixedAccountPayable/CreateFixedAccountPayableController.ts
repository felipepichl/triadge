import { CreateFixedAccountsPayableUseCase } from '@modules/accountPayable/useCases/createFixedAccountsPayable/CreateFixedAccounsPayableUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateFixedAccountPayableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, amount, dueDate, financialCategoryId, subcategoryId } =
      request.body
    const { id: userId } = request.user

    const createFixedAccountPayableUseCase = container.resolve(
      CreateFixedAccountsPayableUseCase,
    )

    await createFixedAccountPayableUseCase.execute({
      description,
      amount,
      dueDate,
      userId,
      financialCategoryId,
      subcategoryId,
    })

    return response.status(201).send()
  }
}

export { CreateFixedAccountPayableController }
