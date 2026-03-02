import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable';
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository';
declare class AccountsPayableRepository implements IAccountsPayableRepository {
    create({ id, description, amount, dueDate, paymentDate, isPaid, isFixed, userId, financialCategoryId, subcategoryId, }: AccountPayable): Promise<void>;
    createMany(accounts: AccountPayable[]): Promise<void>;
    update({ id, description, amount, dueDate, paymentDate, isPaid, isFixed, interestPaid, isInterestPaid, userId, financialCategoryId, subcategoryId, }: AccountPayable): Promise<void>;
    listAll(userId: string, page?: number, pageSize?: number): Promise<AccountPayable[]>;
    listByDateRange(userId: string, startDate: Date, endDate: Date): Promise<AccountPayable[]>;
    listAllFixedAccountsByMonth(userId: string, month: number): Promise<AccountPayable[]>;
    listAllUnfixedAccountsByMonth(userId: string, month: number): Promise<AccountPayable[]>;
    listAllUnpaidAccountsByMonth(userId: string, month: number): Promise<AccountPayable[]>;
    listAllPaidAccountsByMonth(userId: string, month: number): Promise<AccountPayable[]>;
    findById(accountPayableId: string): Promise<AccountPayable>;
    markAccountAsPaid(accountPayableId: string): Promise<void>;
}
export { AccountsPayableRepository };
//# sourceMappingURL=AccountsPayableRepository.d.ts.map