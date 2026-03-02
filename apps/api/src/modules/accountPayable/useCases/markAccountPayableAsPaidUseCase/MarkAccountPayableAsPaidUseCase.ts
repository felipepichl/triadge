import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

interface IResquest {
  accountPayableId: string
}
@injectable()
class MarkAccountPayableAsPaidUseCase implements IUseCase<IResquest, void> {
  constructor(
    @inject('AccountsPayableRepository')
    private accountsPayableRepository: IAccountsPayableRepository,
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute({ accountPayableId }: IResquest): Promise<void> {
    const accountPayable =
      await this.accountsPayableRepository.findById(accountPayableId)

    if (!accountPayable) {
      throw new AppError('Account Payable not found')
    }

    if (accountPayable.isPaid) {
      throw new AppError('Account Payable is already paid')
    }

    const transaction = Transaction.createTransaction({
      description: accountPayable.description,
      type: 'outcome',
      amount: accountPayable.amount,
      userId: accountPayable.userId,
      financialCategoryId: accountPayable.financialCategoryId,
      subcategoryId: accountPayable.subcategoryId,
    })

    await this.transactionsRepository.create(transaction)

    accountPayable.markAsPaid()

    await this.accountsPayableRepository.update(accountPayable)
  }
}

export { MarkAccountPayableAsPaidUseCase }
