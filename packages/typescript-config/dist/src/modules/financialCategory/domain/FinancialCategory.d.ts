import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';
interface IFinancialCategory {
    id?: string;
    description: string;
    userId: string;
    parentCategoryId?: string;
}
declare class FinancialCategory extends AggregateRoot<IFinancialCategory> {
    constructor(props: IFinancialCategory, id?: UniqueEntityID);
    get description(): string;
    get parentCategoryId(): string;
    get userId(): string;
    static createFinancialCategory({ id, description, userId, parentCategoryId, }: IFinancialCategory): FinancialCategory;
}
export { FinancialCategory };
//# sourceMappingURL=FinancialCategory.d.ts.map