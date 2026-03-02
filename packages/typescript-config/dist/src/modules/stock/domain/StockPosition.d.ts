import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';
import { IStockType } from './StockType';
interface IStockPositionProps {
    id?: UniqueEntityID | string;
    symbol: string;
    quantity?: number;
    type?: IStockType;
    avgPrice: number;
    userId?: string;
}
declare class StockPosition extends AggregateRoot<IStockPositionProps> {
    constructor(props: IStockPositionProps, id?: UniqueEntityID);
    get symbol(): string;
    get quantity(): number;
    get type(): IStockType;
    get avgPrice(): number;
    get userId(): string;
    static createStockPosition({ id, symbol, quantity, type, avgPrice, userId, }: IStockPositionProps): StockPosition;
}
export { StockPosition };
//# sourceMappingURL=StockPosition.d.ts.map