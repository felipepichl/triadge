import { IStockOperationType } from '@modules/stock/domain/StockOperationType';
import { IStockType } from '@modules/stock/domain/StockType';
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider';
import { IStockPositionRepository } from '@modules/stock/repositories/IStockPositionRepository';
import { IStockRepository } from '@modules/stock/repositories/IStockRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    symbol: string;
    price: number;
    date?: Date;
    quantity: number;
    type: IStockType;
    operation?: IStockOperationType;
    userId: string;
}
declare class BuyUseCase implements IUseCase<IRequest, void> {
    private stockRepository;
    private b3Provider;
    private stockPositionRepository;
    constructor(stockRepository: IStockRepository, b3Provider: IB3Provider, stockPositionRepository: IStockPositionRepository);
    execute({ symbol, price, date, quantity, type, operation, userId, }: IRequest): Promise<void>;
}
export { BuyUseCase };
//# sourceMappingURL=BuyUseCase.d.ts.map