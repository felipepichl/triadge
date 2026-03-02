import { MarkAccountPayableAsPaidUseCase } from '@modules/accountPayable/useCases/markAccountPayableAsPaidUseCase/MarkAccountPayableAsPaidUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class MarkAccountPayableAsPaidController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: accountPayableId } = request.params

    const markAccountPayableAsPaidUseCase = container.resolve(
      MarkAccountPayableAsPaidUseCase,
    )

    await markAccountPayableAsPaidUseCase.execute({ accountPayableId })

    return response.status(201).send()
  }
}

export { MarkAccountPayableAsPaidController }
