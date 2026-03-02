import { IStockType } from '@modules/stock/domain/StockType';
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider';
import { IStockPositionRepository } from '@modules/stock/repositories/IStockPositionRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    type: IStockType;
}
interface IResponse {
    portfolio: {
        stock: {
            shortName: string;
            symbol: string;
            totalStock: number;
        };
        totalInvested: number;
        currentValue: number;
        quote: number;
        minPrice: number;
        maxPrice: number;
    }[];
}
declare class GetPortfolioQuotesUseCase implements IUseCase<IRequest, IResponse> {
    private stockPositionRepository;
    private b3Provider;
    constructor(stockPositionRepository: IStockPositionRepository, b3Provider: IB3Provider);
    execute({ userId, type }: IRequest): Promise<IResponse>;
}
export { GetPortfolioQuotesUseCase };
//# sourceMappingURL=GetPortfolioQuotesUseCase.d.ts.map