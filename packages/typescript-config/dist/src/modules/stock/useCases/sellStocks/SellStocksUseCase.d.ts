import { IStockOperationType } from '@modules/stock/domain/StockOperationType';
import { IStockPositionRepository } from '@modules/stock/repositories/IStockPositionRepository';
import { IStockRepository } from '@modules/stock/repositories/IStockRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    symbol: string;
    price: number;
    date?: Date;
    quantity: number;
    operation?: IStockOperationType;
    userId: string;
}
declare class SellStocksUseCase implements IUseCase<IRequest, void> {
    private stockRepository;
    private stockPositionRepository;
    constructor(stockRepository: IStockRepository, stockPositionRepository: IStockPositionRepository);
    execute({ symbol, price, date, quantity, operation, userId, }: IRequest): Promise<void>;
}
export { SellStocksUseCase };
//# sourceMappingURL=SellStocksUseCase.d.ts.map