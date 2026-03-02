"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
const date_fns_1 = require("date-fns");
const StockPayableMappers_1 = require("../mappers/StockPayableMappers");
class StockRepository {
    async create({ id, shortName, symbol, price, date, quantity, type, operation, userId, }) {
        const data = {
            shortName,
            symbol,
            price,
            date,
            quantity,
            type: type.stockType,
            operation: operation.stockOperationType,
            userId,
        };
        await prisma_1.PrismaSingleton.getInstance().stock.upsert({
            where: { id: id.toString() },
            create: data,
            update: data,
        });
    }
    async listAll(userId) {
        const result = await prisma_1.PrismaSingleton.getInstance().stock.findMany({
            where: { userId },
        });
        return StockPayableMappers_1.StockMappers.getMapper().toDomainArray(result);
    }
    async listByDateRange(userId, startDate, endDate) {
        const normalizedStartDate = (0, date_fns_1.startOfDay)(startDate);
        const normalizedEndDate = (0, date_fns_1.endOfDay)(endDate);
        const result = await prisma_1.PrismaSingleton.getInstance().stock.findMany({
            where: {
                userId,
                date: { gte: normalizedStartDate, lte: normalizedEndDate },
            },
        });
        return StockPayableMappers_1.StockMappers.getMapper().toDomainArray(result);
    }
    async listByType(userId, type) {
        const result = await prisma_1.PrismaSingleton.getInstance().stock.findMany({
            where: { userId, type: type.stockType },
        });
        return StockPayableMappers_1.StockMappers.getMapper().toDomainArray(result);
    }
    async listByMonth(userId, month) {
        const year = new Date().getFullYear();
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const result = await prisma_1.PrismaSingleton.getInstance().stock.findMany({
            where: {
                userId,
                AND: [{ date: { gte: startDate } }, { date: { lte: endDate } }],
            },
            orderBy: { date: 'asc' },
        });
        return StockPayableMappers_1.StockMappers.getMapper().toDomainArray(result);
    }
    listAllSymbolsByUserIdAndType(userId, type) {
        throw new Error('Method not implemented.');
    }
    async findBySymbol(symbol) {
        const result = await prisma_1.PrismaSingleton.getInstance().stock.findFirst({
            where: { symbol },
        });
        return StockPayableMappers_1.StockMappers.getMapper().toDomain(result);
    }
}
exports.StockRepository = StockRepository;
//# sourceMappingURL=StockRepository.js.map