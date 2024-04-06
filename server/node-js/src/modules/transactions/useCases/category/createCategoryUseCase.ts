import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  description: string
}

class createCategoryUseCase implements IUseCase<IRequest, void> {
  execute({ description }: IRequest): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export { createCategoryUseCase }
