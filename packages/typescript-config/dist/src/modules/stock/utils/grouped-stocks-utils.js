"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupedStocksUtils = groupedStocksUtils;
function groupedStocksUtils(stocks) {
    return stocks.reduce((acc, stock) => {
        var _a, _b;
        if (!acc[stock.symbol]) {
            acc[stock.symbol] = {
                shortName: stock.shortName,
                totalStock: 0,
                totalInvested: 0,
                minPrice: stock.price,
                maxPrice: stock.price,
            };
        }
        const group = acc[stock.symbol];
        group.totalStock += (_a = stock.quantity) !== null && _a !== void 0 ? _a : 0;
        group.totalInvested += ((_b = stock.quantity) !== null && _b !== void 0 ? _b : 0) * stock.price;
        group.minPrice = Math.min(group.minPrice, stock.price);
        group.maxPrice = Math.max(group.maxPrice, stock.price);
        return acc;
    }, {});
}
//# sourceMappingURL=grouped-stocks-utils.js.map