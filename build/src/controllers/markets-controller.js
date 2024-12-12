"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketsController = void 0;
const prisma_1 = require("@/database/prisma");
const zod_1 = require("zod");
class MarketsController {
    async index(request, response, next) {
        try {
            const paramsSchema = zod_1.z.object({
                category_id: zod_1.z.string().uuid(),
            });
            const { category_id } = paramsSchema.parse(request.params);
            const markets = await prisma_1.prisma.market.findMany({
                where: { categoryId: category_id },
                orderBy: { name: "asc" },
            });
            return response.json(markets);
        }
        catch (error) {
            next(error);
        }
    }
    async show(request, response, next) {
        try {
            const paramsSchema = zod_1.z.object({
                id: zod_1.z.string().uuid(),
            });
            const { id } = paramsSchema.parse(request.params);
            const markets = await prisma_1.prisma.market.findUnique({
                where: { id },
                include: {
                    rules: true,
                },
            });
            return response.json(markets);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.MarketsController = MarketsController;
//# sourceMappingURL=markets-controller.js.map