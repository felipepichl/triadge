import { IB3DTO } from '../dtos/IB3DTO';
import { IB3Provider } from '../models/IB3Provider';
declare class B3ProviderInMemory implements IB3Provider {
    stocks: IB3DTO[];
    getQuoteTickers(ticket: string): Promise<IB3DTO>;
    getPortfolioQuotes(tickets: string[]): Promise<IB3DTO[]>;
    addSymbol(symbols: string[]): Promise<void>;
}
export { B3ProviderInMemory };
//# sourceMappingURL=B3ProviderInMemory.d.ts.map