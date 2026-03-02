import { Stock } from '@modules/stock/domain/Stock';
import { IStockType } from '@modules/stock/domain/StockType';
import { IStockRepository } from '@modules/stock/repositories/IStockRepository';
declare class StockRepository implements IStockRepository {
    create({ id, shortName, symbol, price, date, quantity, type, operation, userId, }: Stock): Promise<void>;
    listAll(userId: string): Promise<Stock[]>;
    listByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Stock[]>;
    listByType(userId: string, type: IStockType): Promise<Stock[]>;
    listByMonth(userId: string, month: number): Promise<Stock[]>;
    listAllSymbolsByUserIdAndType(userId: string, type: IStockType): Promise<string[]>;
    findBySymbol(symbol: string): Promise<Stock>;
}
export { StockRepository };
//# sourceMappingURL=StockRepository.d.ts.map