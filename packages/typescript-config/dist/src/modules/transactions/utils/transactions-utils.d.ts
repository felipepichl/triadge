import { Transaction } from '@modules/transactions/domain/transaction/Transaction';
interface TransactionSummary {
    income: number;
    outcome: number;
}
export declare function calculateTransactionTotals(transactions: Transaction[]): TransactionSummary;
export {};
//# sourceMappingURL=transactions-utils.d.ts.map