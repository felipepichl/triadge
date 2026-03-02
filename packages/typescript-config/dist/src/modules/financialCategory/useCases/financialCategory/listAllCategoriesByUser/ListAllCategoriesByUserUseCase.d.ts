import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
}
interface IResponse {
    financialCategories: FinancialCategory[];
}
declare class ListAllCategoriesByUserUseCase implements IUseCase<IRequest, IResponse> {
    private financialCategoriesRepository;
    constructor(financialCategoriesRepository: IFinancialCategoriesRepository);
    execute({ userId }: IRequest): Promise<IResponse>;
}
export { ListAllCategoriesByUserUseCase };
//# sourceMappingURL=ListAllCategoriesByUserUseCase.d.ts.map