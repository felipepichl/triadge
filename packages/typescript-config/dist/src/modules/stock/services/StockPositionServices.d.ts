import { StockPosition } from '../domain/StockPosition';
declare class StockPositionServices {
    static increasePosition(stockPosition: StockPosition, quantity: number, price: number): StockPosition;
    static decreasePosition(stockPosition: StockPosition, quantity: number): StockPosition;
}
export { StockPositionServices };
//# sourceMappingURL=StockPositionServices.d.ts.map