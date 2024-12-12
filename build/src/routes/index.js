"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const coupons_route_1 = require("./coupons-route");
const markets_route_1 = require("./markets-route");
const categories_route_1 = require("./categories-route");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use("/categories", categories_route_1.categoriesRoutes);
routes.use("/markets", markets_route_1.marketsRoutes);
routes.use("/coupons", coupons_route_1.couponsRoutes);
//# sourceMappingURL=index.js.map