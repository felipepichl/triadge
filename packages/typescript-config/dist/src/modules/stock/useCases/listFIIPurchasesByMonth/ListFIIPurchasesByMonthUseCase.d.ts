import { Stock } from '@modules/stock/domain/Stock';
import { IStockRepository } from '@modules/stock/repositories/IStockRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    month: number;
}
interface IResponse {
    stocks: Stock[];
}
declare class ListFIIPurchasesByMonthUseCase implements IUseCase<IRequest, IResponse> {
    private stocksRepository;
    constructor(stocksRepository: IStockRepository);
    execute({ userId, month }: IRequest): Promise<IResponse>;
}
export { ListFIIPurchasesByMonthUseCase };
//# sourceMappingURL=ListFIIPurchasesByMonthUseCase.d.ts.map