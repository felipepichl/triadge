import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { Transaction } from '@modules/transactions/domain/transaction/Transaction';
import { Transaction as RawTransaction } from '@prisma/client';
import { IMapper } from '@shared/core/infra/Mapper';
interface TransactionWithCategory extends RawTransaction {
    financialCategory?: FinancialCategory;
}
declare class TransactionMappers implements IMapper<Transaction, RawTransaction> {
    toPersistence(transaction: Transaction): Transaction;
    toDomain({ id, description, detail, type, amount, date, userId, financialCategory, financialCategoryId, }: TransactionWithCategory): Transaction;
    toDomainArray(rawTransactions: RawTransaction[]): Transaction[];
    getMapper(): IMapper<Transaction, RawTransaction>;
    static getMapper(): TransactionMappers;
}
export { TransactionMappers };
//# sourceMappingURL=TransactionMappers.d.ts.map