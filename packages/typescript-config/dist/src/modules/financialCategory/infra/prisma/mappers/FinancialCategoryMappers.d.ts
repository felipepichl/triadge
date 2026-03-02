import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory';
import { FinancialCategory as RawFinancialCategory } from '@prisma/client';
import { IMapper } from '@shared/core/infra/Mapper';
declare class FinancialCategoryMappers implements IMapper<FinancialCategory, RawFinancialCategory> {
    toPersistence(financialCategory: FinancialCategory): FinancialCategory;
    toDomain(raw: RawFinancialCategory): FinancialCategory;
    toDomainArray(rawFinancialCategory: RawFinancialCategory[]): FinancialCategory[];
    getMapper(): IMapper<FinancialCategory, RawFinancialCategory>;
    static getMapper(): FinancialCategoryMappers;
}
export { FinancialCategoryMappers };
//# sourceMappingURL=FinancialCategoryMappers.d.ts.map