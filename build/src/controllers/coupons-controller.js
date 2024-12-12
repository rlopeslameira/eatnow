"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsController = void 0;
const prisma_1 = require("@/database/prisma");
const AppError_1 = require("@/utils/AppError");
const node_crypto_1 = __importDefault(require("node:crypto"));
const zod_1 = require("zod");
class CouponsController {
    async update(request, response, next) {
        try {
            const paramsSchema = zod_1.z.object({
                market_id: zod_1.z.string().uuid(),
            });
            const { market_id } = paramsSchema.parse(request.params);
            console.log(market_id);
            const market = await prisma_1.prisma.market.findUnique({
                where: { id: market_id },
            });
            if (!market) {
                throw new AppError_1.AppError("Estabelecimento não encontrado!", 404);
            }
            if (market.coupons <= 0) {
                throw new AppError_1.AppError("Não há cupom disponível no momento!");
            }
            await prisma_1.prisma.market.update({
                data: { coupons: { decrement: 1 } },
                where: { id: market_id },
            });
            const coupon = node_crypto_1.default
                .createHash("sha256")
                .update(market.id)
                .digest("hex")
                .substring(0, 8)
                .toUpperCase();
            return response.json({ coupon });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CouponsController = CouponsController;
//# sourceMappingURL=coupons-controller.js.map