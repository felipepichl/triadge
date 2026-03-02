import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IResponse {
    subcategories: FinancialCategory[];
}
interface IRequest {
    userId: string;
    parentCategoryId: string;
}
declare class ListSubcategoriesByCategoryIdUseCase implements IUseCase<IRequest, IResponse> {
    private financialCategoriesRepository;
    constructor(financialCategoriesRepository: IFinancialCategoriesRepository);
    execute({ userId, parentCategoryId }: IRequest): Promise<IResponse>;
}
export { ListSubcategoriesByCategoryIdUseCase };
//# sourceMappingURL=ListSubcategoriesByCategoryIdUseCase.d.ts.map