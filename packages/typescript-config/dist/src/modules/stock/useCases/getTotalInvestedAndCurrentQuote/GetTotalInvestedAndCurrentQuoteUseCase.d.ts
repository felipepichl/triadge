import { IStockType } from '@modules/stock/domain/StockType';
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider';
import { IStockRepository } from '@modules/stock/repositories/IStockRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    type: IStockType;
}
interface IResponse {
    totalInvested: number;
    currentValue: number;
    position: number;
}
declare class GetTotalInvestedAndCurrentQuoteUseCase implements IUseCase<IRequest, IResponse> {
    private stocksRpository;
    private b3Provider;
    constructor(stocksRpository: IStockRepository, b3Provider: IB3Provider);
    execute({ userId, type }: IRequest): Promise<IResponse>;
}
export { GetTotalInvestedAndCurrentQuoteUseCase };
//# sourceMappingURL=GetTotalInvestedAndCurrentQuoteUseCase.d.ts.map