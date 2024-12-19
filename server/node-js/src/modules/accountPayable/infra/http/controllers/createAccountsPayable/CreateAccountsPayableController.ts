import { CreateAccountPayableUseCase } from '@modules/accountPayable/useCases/createAccountPayableUseCase/CreateAccountPayableUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateAccountsPayableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      description,
      amount,
      dueDate,
      financialCategoryId,
      subcategoryId,
      installments,
    } = request.body
    const { id: userId } = request.user

    const createAccountPayableUseCase = container.resolve(
      CreateAccountPayableUseCase,
    )

    await createAccountPayableUseCase.execute({
      description,
      amount,
      dueDate,
      userId,
      financialCategoryId,
      subcategoryId,
      installments,
    })

    return response.status(201).send()
  }
}

export { CreateAccountsPayableController }
