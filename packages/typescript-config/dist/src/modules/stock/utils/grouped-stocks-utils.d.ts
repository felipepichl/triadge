import { Stock } from '../domain/Stock';
export declare function groupedStocksUtils(stocks: Stock[]): Record<string, {
    shortName: string;
    totalStock: number;
    totalInvested: number;
    minPrice: number;
    maxPrice: number;
}>;
//# sourceMappingURL=grouped-stocks-utils.d.ts.map