import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    description: string;
    userId: string;
    parentCategoryId: string;
}
declare class CreateSubcategoryUseCase implements IUseCase<IRequest, void> {
    private financialCategoriesRepository;
    constructor(financialCategoriesRepository: IFinancialCategoriesRepository);
    execute({ description, userId, parentCategoryId, }: IRequest): Promise<void>;
}
export { CreateSubcategoryUseCase };
//# sourceMappingURL=CreateSubcategoryUseCase.d.ts.map