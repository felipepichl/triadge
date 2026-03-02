import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable';
import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository';
import { Transaction } from '@modules/transactions/domain/transaction/Transaction';
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType';
declare class FinancialCategoriesRepository implements IFinancialCategoriesRepository {
    create({ id, description, parentCategoryId, userId, }: FinancialCategory): Promise<void>;
    listAllCategoriesByUser(userId: string): Promise<FinancialCategory[]>;
    listSubcategoriesByCategoryId(userId: string, parentCategoryId: string): Promise<FinancialCategory[]>;
    listFinancialCategoriesWithTransactionsByType(userId: string, type: ITransactionType, month: number): Promise<Array<{
        financialCategory: FinancialCategory;
        financialCategoryTransactions: Transaction[];
    }>>;
    listFinancialCategoriesWithFixedAccountsPayable(userId: string, month: number): Promise<Array<{
        financialCategory: FinancialCategory;
        financialCategoryAccountsPayable: AccountPayable[];
    }>>;
    listFinancialCategoriesWithUnfixedAccountsPayable(userId: string, month: number): Promise<Array<{
        financialCategory: FinancialCategory;
        financialCategoryAccountsPayable: AccountPayable[];
    }>>;
    findByDescription(description: string): Promise<FinancialCategory>;
    findByDescriptionAndParentCategory(description: string, parentCategoryId: string): Promise<FinancialCategory>;
    findById(id: string): Promise<FinancialCategory>;
}
export { FinancialCategoriesRepository };
//# sourceMappingURL=FinancialCategoriesRepository.d.ts.map