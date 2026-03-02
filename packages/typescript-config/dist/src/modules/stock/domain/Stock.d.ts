import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';
import { IStockOperationType } from './StockOperationType';
import { IStockType } from './StockType';
interface IStockProps {
    id?: string;
    shortName: string;
    symbol: string;
    price: number;
    date?: Date;
    quantity?: number;
    type?: IStockType;
    operation?: IStockOperationType;
    userId?: string;
}
declare class Stock extends AggregateRoot<IStockProps> {
    constructor(props: IStockProps, id?: UniqueEntityID);
    get shortName(): string;
    get symbol(): string;
    get price(): number;
    get date(): Date;
    get quantity(): number;
    get type(): IStockType;
    get operation(): IStockOperationType;
    get userId(): string;
    static createStock({ id, shortName, symbol, price, date, quantity, type, operation, userId, }: IStockProps): Stock;
}
export { Stock };
//# sourceMappingURL=Stock.d.ts.map