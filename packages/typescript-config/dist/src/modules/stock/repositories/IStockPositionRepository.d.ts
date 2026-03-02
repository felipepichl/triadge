import { StockPosition } from '../domain/StockPosition';
import { IStockType } from '../domain/StockType';
interface IStockPositionRepository {
    create(stockPosition: StockPosition): Promise<void>;
    update(stockPosition: StockPosition): Promise<void>;
    findByUserAndSymbol(userId: string, symbol: string): Promise<StockPosition | null>;
    listByType(userId: string, type: IStockType): Promise<StockPosition[]>;
}
export { IStockPositionRepository };
//# sourceMappingURL=IStockPositionRepository.d.ts.map