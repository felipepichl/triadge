import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';
interface IAccounPayableProps {
    id?: string;
    description: string;
    amount: number;
    dueDate: Date;
    paymentDate?: Date;
    isPaid?: boolean;
    isFixed?: boolean;
    interestPaid?: number;
    isInterestPaid?: boolean;
    userId: string;
    financialCategory?: FinancialCategory;
    financialCategoryId: string;
    subcategory?: FinancialCategory;
    subcategoryId?: string;
}
declare class AccountPayable extends AggregateRoot<IAccounPayableProps> {
    constructor(props: IAccounPayableProps, id?: UniqueEntityID);
    get description(): string;
    get amount(): number;
    get dueDate(): Date;
    get paymentDate(): Date;
    get isPaid(): boolean;
    get isFixed(): boolean;
    get interestPaid(): number;
    get isInterestPaid(): boolean;
    get userId(): string;
    get financialCategory(): FinancialCategory;
    get financialCategoryId(): string;
    get subcategory(): FinancialCategory;
    get subcategoryId(): string;
    static createAccountPayable({ id, description, amount, dueDate, paymentDate, isPaid, isFixed, interestPaid, isInterestPaid, userId, financialCategory, financialCategoryId, subcategory, subcategoryId, }: IAccounPayableProps): AccountPayable;
    markAsPaid(): void;
    updateAmountVariable(amount: number): void;
    updateInterestPaid(interest: number, isInterestPaid?: boolean): void;
}
export { AccountPayable };
//# sourceMappingURL=AccountPayable.d.ts.map