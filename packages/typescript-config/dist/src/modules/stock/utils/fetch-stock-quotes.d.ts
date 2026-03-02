import { IB3Provider } from '../providers/B3Provider/models/IB3Provider';
export declare function fetchStockQuotes(symbols: string[], b3Provider: IB3Provider): Promise<{
    symbol: string;
    price: number;
    shortName: string;
}[]>;
//# sourceMappingURL=fetch-stock-quotes.d.ts.map