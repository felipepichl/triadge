import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  description: string
  amount: number
  dueDate: Date
  userId: string
  financialCategoryId: string
  subcategoryId: string
  months?: number
}

class CreateFixedAccountsPayableUseCase implements IUseCase<IRequest, void> {
  constructor(private accountsPayableRepository: IAccountsPayableRepository) {}

  async execute({
    description,
    amount,
    dueDate,
    userId,
    financialCategoryId,
    subcategoryId,
    months = 12,
  }: IRequest): Promise<void> {
    if (months <= 0) {
      throw new AppError('The number of months must be greater than zero.')
    }

    const accounts: AccountPayable[] = []

    for (let i = 0; i < months; i++) {
      const nextDueDate = new Date(dueDate)
      nextDueDate.setMonth(nextDueDate.getMonth() + i)

      const accountPayable = AccountPayable.createAccountPayable({
        description,
        amount,
        dueDate: nextDueDate,
        isFixed: true,
        userId,
        financialCategoryId,
        subcategoryId,
      })

      accounts.push(accountPayable)
    }

    await this.accountsPayableRepository.createMany(accounts)
  }
}

export { CreateFixedAccountsPayableUseCase }
