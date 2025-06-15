import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
// import { inject, injectable } from 'tsyringe'

interface IRequest {
  amount: number
  accountPayableId: string
}

// @injectable()
class UpdateInterestPaidUseCase implements IUseCase<IRequest, void> {
  constructor(
    // @inject('AccountsPayableRepository')
    private accountsPayableRepository: IAccountsPayableRepository,
  ) {}

  async execute({ amount, accountPayableId }: IRequest): Promise<void> {
    const accountPayable =
      await this.accountsPayableRepository.findById(accountPayableId)

    if (!accountPayable) {
      throw new AppError('Account Payable not found')
    }

    if (amount < accountPayable.amount) {
      throw new AppError('Amount cannot be less than the interest')
    }

    const interest = amount - accountPayable.amount

    accountPayable.updateInterestPaid(interest)
    accountPayable.updateAmountVariable(amount)

    await this.accountsPayableRepository.update(accountPayable)
  }
}

export { UpdateInterestPaidUseCase }
