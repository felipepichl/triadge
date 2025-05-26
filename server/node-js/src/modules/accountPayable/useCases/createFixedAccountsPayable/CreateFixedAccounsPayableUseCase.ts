import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  description: string
  amount: number
  dueDate: Date
  userId: string
  financialCategoryId: string
  subcategoryId: string
  months?: number
}

@injectable()
class CreateFixedAccountsPayableUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('AccountsPayableRepository')
    private accountsPayableRepository: IAccountsPayableRepository,
  ) {}

  async execute({
    description,
    amount,
    dueDate,
    userId,
    financialCategoryId,
    subcategoryId,
    months = 12,
  }: IRequest): Promise<void> {
    const initialDueDate = new Date(dueDate)
    const currentYear = initialDueDate.getFullYear()

    if (months <= 0) {
      throw new AppError('The number of months must be greater than zero.')
    }

    const accounts: AccountPayable[] = []

    for (let i = 0; i < months; i++) {
      const nextDueDate = new Date(initialDueDate)
      nextDueDate.setMonth(nextDueDate.getMonth() + i)

      if (nextDueDate.getDate() !== initialDueDate.getDate()) {
        nextDueDate.setDate(0)
      }

      if (nextDueDate.getFullYear() !== currentYear) {
        break
      }

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
