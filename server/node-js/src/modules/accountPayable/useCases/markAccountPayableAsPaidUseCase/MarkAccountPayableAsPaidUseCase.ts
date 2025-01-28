import { IUseCase } from '@shared/core/domain/IUseCase'

interface IResquest {
  accountPayableId: string
  userId: string
}

class MarkAccountPayableAsPaidUseCase implements IUseCase<IResquest, void> {
  execute({ accountPayableId }: IResquest): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export { MarkAccountPayableAsPaidUseCase }
