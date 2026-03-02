import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable';
import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { Transaction } from '@modules/transactions/domain/transaction/Transaction';
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType';
import { IFinancialCategoriesRepository } from '../IFinancialCategoriesRepository';
declare class FinancialCategoriesRepositoryInMemory implements IFinancialCategoriesRepository {
    private financialCategories;
    private transactions;
    private accountsPayable;
    create(financialCategory: FinancialCategory): Promise<void>;
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
    addTransaction(transaction: Transaction): Promise<void>;
    addAccountPayable(accountPayable: AccountPayable): Promise<void>;
}
export { FinancialCategoriesRepositoryInMemory };
//# sourceMappingURL=FinancialCategoriesRepositoryInMemory.d.ts.map