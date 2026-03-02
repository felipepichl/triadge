import { Transaction } from '@modules/transactions/domain/transaction/Transaction';
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType';
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository';
declare class TransactionsRepository implements ITransactionsRepository {
    create({ id, description, detail, type, date, amount, userId, financialCategoryId, subcategoryId, }: Transaction): Promise<void>;
    listAll(): Promise<Transaction[]>;
    listByMonth(userId: string, month: number): Promise<Transaction[]>;
    listByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Transaction[]>;
    listByType(userId: string, type: ITransactionType): Promise<Transaction[]>;
    listByUser(userId: string): Promise<Transaction[]>;
    listByCategoryAndTypeAndMonth(financialCategoryId: string, type: ITransactionType, month: number): Promise<Transaction[]>;
    findById(id: string): Promise<Transaction>;
    findByDescription(description: string): Promise<Transaction>;
    findByDate(date: Date): Promise<Transaction>;
}
export { TransactionsRepository };
//# sourceMappingURL=TransactionsRepository.d.ts.map