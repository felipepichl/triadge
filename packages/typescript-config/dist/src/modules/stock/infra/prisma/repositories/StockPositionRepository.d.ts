import { StockPosition } from '@modules/stock/domain/StockPosition';
import { IStockType } from '@modules/stock/domain/StockType';
import { IStockPositionRepository } from '@modules/stock/repositories/IStockPositionRepository';
declare class StockPositionRepository implements IStockPositionRepository {
    create({ id, symbol, type, quantity, avgPrice, userId, }: StockPosition): Promise<void>;
    update({ id, symbol, type, quantity, avgPrice, userId, }: StockPosition): Promise<void>;
    findByUserAndSymbol(userId: string, symbol: string): Promise<StockPosition | null>;
    listByType(userId: string, type: IStockType): Promise<StockPosition[]>;
}
export { StockPositionRepository };
//# sourceMappingURL=StockPositionRepository.d.ts.map