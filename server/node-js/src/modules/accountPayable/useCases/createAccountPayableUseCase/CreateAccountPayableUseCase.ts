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
  installments?: number
}

@injectable()
class CreateAccountPayableUseCase implements IUseCase<IRequest, void> {
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
    installments = 1,
  }: IRequest): Promise<void> {
    if (installments <= 0) {
      throw new AppError(
        'The number of installments must be greater than zero.',
      )
    }

    const installmentAmount = amount / installments
    const accounts: AccountPayable[] = []

    for (let i = 0; i < installments; i++) {
      const nextDueDate = new Date(dueDate)
      nextDueDate.setMonth(nextDueDate.getMonth() + i)

      const accountPayable = AccountPayable.createAccountPayable({
        description: `${description}${installments > 1 ? ` ${i + 1}/${installments}` : ''}`,
        amount: installmentAmount,
        dueDate: nextDueDate,
        userId,
        financialCategoryId,
        subcategoryId,
      })

      accounts.push(accountPayable)
    }

    await this.accountsPayableRepository.createMany(accounts)
  }
}

export { CreateAccountPayableUseCase }
