"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketsRoutes = void 0;
const express_1 = require("express");
const markets_controller_1 = require("@/controllers/markets-controller");
const marketsRoutes = (0, express_1.Router)();
exports.marketsRoutes = marketsRoutes;
const marketsController = new markets_controller_1.MarketsController();
marketsRoutes.get("/category/:category_id", marketsController.index);
marketsRoutes.get("/:id", marketsController.show);
//# sourceMappingURL=markets-route.js.map