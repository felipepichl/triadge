import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    month: number;
}
interface IResponse {
    totalExpensesByFinancialCategory: Array<{
        financialCategory: FinancialCategory;
        totalSpent: number;
    }>;
}
declare class ListTotalSpentToUnfixedAccountPayableUseCase implements IUseCase<IRequest, IResponse> {
    private financialCategoriesRepository;
    constructor(financialCategoriesRepository: IFinancialCategoriesRepository);
    execute({ userId, month }: IRequest): Promise<IResponse>;
}
export { ListTotalSpentToUnfixedAccountPayableUseCase };
//# sourceMappingURL=ListTotalSpentToUnfixedAccountPayableUseCase.d.ts.map