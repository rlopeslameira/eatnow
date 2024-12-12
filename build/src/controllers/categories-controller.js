"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const prisma_1 = require("@/database/prisma");
class CategoriesController {
    async index(request, response, next) {
        try {
            const categories = await prisma_1.prisma.category.findMany({
                orderBy: { name: "asc" },
            });
            return response.json(categories);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories-controller.js.map