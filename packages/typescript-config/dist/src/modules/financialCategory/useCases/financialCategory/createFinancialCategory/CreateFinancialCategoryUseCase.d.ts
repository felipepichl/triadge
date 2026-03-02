import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    description: string;
    userId: string;
}
declare class CreateFinancialCategoryUseCase implements IUseCase<IRequest, void> {
    private financialCategoriesRepository;
    constructor(financialCategoriesRepository: IFinancialCategoriesRepository);
    execute({ description, userId }: IRequest): Promise<void>;
}
export { CreateFinancialCategoryUseCase };
//# sourceMappingURL=CreateFinancialCategoryUseCase.d.ts.map