import { IB3DTO } from '../dtos/IB3DTO';
import { IB3Provider } from '../models/IB3Provider';
declare class BrapiB3Provider implements IB3Provider {
    getQuoteTickers(ticket: string): Promise<IB3DTO>;
    getPortfolioQuotes(tickets: string[]): Promise<IB3DTO[]>;
}
export { BrapiB3Provider };
//# sourceMappingURL=BrapiB3Provider.d.ts.map