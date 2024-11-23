import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  description: string
  amount: number
  dueDate: Date
  totalInstallments: number
  userId: string
  financialCategoryId: string
  subcategoryId: string
}

class CreateAccountPayable implements IUseCase<IRequest, void> {
  constructor(private accountsPayableRepository: IAccountsPayableRepository) {}

  async execute({
    description,
    amount,
    dueDate,
    totalInstallments,
    userId,
    financialCategoryId,
    subcategoryId,
  }: IRequest): Promise<void> {
    const accountPayable = AccountPayable.createAccountPayable({
      description,
      amount,
      dueDate,
      isPaid: false,
      totalInstallments,
      userId,
      financialCategoryId,
      subcategoryId,
    })

    await this.accountsPayableRepository.create(accountPayable)
  }
}

export { CreateAccountPayable }
