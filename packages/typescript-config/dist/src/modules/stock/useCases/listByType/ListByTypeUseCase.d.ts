import { Stock } from '@modules/stock/domain/Stock';
import { IStockType } from '@modules/stock/domain/StockType';
import { IStockRepository } from '@modules/stock/repositories/IStockRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    type: IStockType;
}
interface IResponse {
    stocks: Stock[];
}
declare class ListByTypeUseCase implements IUseCase<IRequest, IResponse> {
    private stocksRepository;
    constructor(stocksRepository: IStockRepository);
    execute({ userId, type }: IRequest): Promise<IResponse>;
}
export { ListByTypeUseCase };
//# sourceMappingURL=ListByTypeUseCase.d.ts.map