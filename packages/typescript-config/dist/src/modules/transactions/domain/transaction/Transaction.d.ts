import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';
export interface ITransactionProps {
    id?: string;
    description: string;
    detail?: string;
    type: 'income' | 'outcome';
    amount: number;
    date?: Date;
    userId: string;
    financialCategory?: FinancialCategory;
    financialCategoryId: string;
    subcategory?: FinancialCategory;
    subcategoryId?: string;
}
declare class Transaction extends AggregateRoot<ITransactionProps> {
    constructor(props: ITransactionProps, id?: UniqueEntityID);
    get description(): string;
    get detail(): string;
    get type(): 'income' | 'outcome';
    get amount(): number;
    get date(): Date;
    get userId(): string;
    get financialCategory(): FinancialCategory;
    get financialCategoryId(): string;
    get subcategory(): FinancialCategory;
    get subcategoryId(): string;
    static createTransaction({ id, description, detail, type, amount, date, userId, financialCategoryId, financialCategory, subcategoryId, subcategory, }: ITransactionProps): Transaction;
}
export { Transaction };
//# sourceMappingURL=Transaction.d.ts.map