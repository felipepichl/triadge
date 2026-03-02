import { Stock } from '@modules/stock/domain/Stock';
import { Stock as RawStock } from '@prisma/client';
import { IMapper } from '@shared/core/infra/Mapper';
declare class StockMappers implements IMapper<Stock, RawStock> {
    toPersistence(stock: Stock): Stock;
    toDomain({ id, shortName, symbol, price, date, quantity, type, operation, userId, }: RawStock): Stock;
    toDomainArray(rawStock: RawStock[]): Stock[];
    getMapper(): IMapper<Stock, RawStock>;
    static getMapper(): StockMappers;
}
export { StockMappers };
//# sourceMappingURL=StockPayableMappers.d.ts.map