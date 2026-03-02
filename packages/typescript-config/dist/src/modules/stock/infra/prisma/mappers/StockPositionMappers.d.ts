import { StockPosition } from '@modules/stock/domain/StockPosition';
import { StockPosition as RawStockPosition } from '@prisma/client';
import { IMapper } from '@shared/core/infra/Mapper';
declare class StockPositionMappers implements IMapper<StockPosition, RawStockPosition> {
    toPersistence(stockPosition: StockPosition): StockPosition;
    toDomain({ id, symbol, type, quantity, avgPrice, userId, }: RawStockPosition): StockPosition;
    toDomainArray(rawStock: RawStockPosition[]): StockPosition[];
    getMapper(): IMapper<StockPosition, RawStockPosition>;
    static getMapper(): StockPositionMappers;
}
export { StockPositionMappers };
//# sourceMappingURL=StockPositionMappers.d.ts.map