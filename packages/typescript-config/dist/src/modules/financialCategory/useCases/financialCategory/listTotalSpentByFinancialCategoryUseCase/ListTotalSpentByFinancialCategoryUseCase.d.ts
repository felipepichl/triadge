import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository';
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    type: ITransactionType;
    month: number;
}
interface IResponse {
    totalExpensesByFinancialCategory: Array<{
        financialCategory: FinancialCategory;
        totalSpent: number;
    }>;
}
declare class ListTotalSpentByFinancialCategoryUseCase implements IUseCase<IRequest, IResponse> {
    private financialCategoriesRepository;
    constructor(financialCategoriesRepository: IFinancialCategoriesRepository);
    execute({ userId, type, month }: IRequest): Promise<IResponse>;
}
export { ListTotalSpentByFinancialCategoryUseCase };
//# sourceMappingURL=ListTotalSpentByFinancialCategoryUseCase.d.ts.map