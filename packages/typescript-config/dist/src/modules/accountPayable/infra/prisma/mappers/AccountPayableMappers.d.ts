import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable';
import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { AccountPayable as RawAccountPayable } from '@prisma/client';
import { IMapper } from '@shared/core/infra/Mapper';
interface AccountPayableWithCategory {
    id: string;
    description: string;
    amount: number | string | {
        toNumber(): number;
    };
    dueDate: Date;
    paymentDate?: Date | null;
    isPaid: boolean;
    isFixed: boolean;
    userId: string;
    financialCategoryId: string;
    financialCategory?: FinancialCategory | {
        id: string;
        description: string;
    } | null;
    subcategory?: FinancialCategory | {
        id: string;
        description: string;
    } | null;
    subcategoryId?: string | null;
}
declare class AccountPayableMappers implements IMapper<AccountPayable, RawAccountPayable> {
    toPersistence(accountPayable: AccountPayable): AccountPayable;
    toDomain({ id, description, amount, dueDate, paymentDate, isPaid, isFixed, userId, financialCategory, financialCategoryId, }: AccountPayableWithCategory): AccountPayable;
    toDomainArray(rawAccountsPayable: AccountPayableWithCategory[]): AccountPayable[];
    getMapper(): IMapper<AccountPayable, RawAccountPayable>;
    static getMapper(): AccountPayableMappers;
}
export { AccountPayableMappers };
//# sourceMappingURL=AccountPayableMappers.d.ts.map