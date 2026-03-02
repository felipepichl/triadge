import { StockPosition } from '@modules/stock/domain/StockPosition';
import { IStockType } from '@modules/stock/domain/StockType';
import { IStockPositionRepository } from '../IStockPositionRepository';
declare class StockPositionRepositoryInMemory implements IStockPositionRepository {
    private stocks;
    create(stockPosition: StockPosition): Promise<void>;
    update(stockPosition: StockPosition): Promise<void>;
    findByUserAndSymbol(userId: string, symbol: string): Promise<StockPosition | null>;
    listByType(userId: string, type: IStockType): Promise<StockPosition[]>;
}
export { StockPositionRepositoryInMemory };
//# sourceMappingURL=StockPositionRepositoryInMemory.d.ts.map