"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockPositionRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
const StockPositionMappers_1 = require("../mappers/StockPositionMappers");
class StockPositionRepository {
    async create({ id, symbol, type, quantity, avgPrice, userId, }) {
        const data = {
            id: id.toString(),
            symbol,
            type: type.stockType,
            quantity,
            avgPrice,
            userId,
        };
        await prisma_1.PrismaSingleton.getInstance().stockPosition.create({
            data,
        });
    }
    async update({ id, symbol, type, quantity, avgPrice, userId, }) {
        await prisma_1.PrismaSingleton.getInstance().stockPosition.update({
            where: { id: id.toString() },
            data: {
                symbol,
                type: type.stockType,
                quantity,
                avgPrice,
                userId,
            },
        });
    }
    async findByUserAndSymbol(userId, symbol) {
        const result = await prisma_1.PrismaSingleton.getInstance().stockPosition.findFirst({
            where: { symbol, userId },
        });
        if (!result) {
            return null;
        }
        return StockPositionMappers_1.StockPositionMappers.getMapper().toDomain(result);
    }
    async listByType(userId, type) {
        const results = await prisma_1.PrismaSingleton.getInstance().stockPosition.findMany({
            where: {
                userId,
                type: type.stockType,
            },
        });
        return results.map((result) => StockPositionMappers_1.StockPositionMappers.getMapper().toDomain(result));
    }
}
exports.StockPositionRepository = StockPositionRepository;
//# sourceMappingURL=StockPositionRepository.js.map