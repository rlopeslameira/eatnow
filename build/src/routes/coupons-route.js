"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponsRoutes = void 0;
const express_1 = require("express");
const coupons_controller_1 = require("@/controllers/coupons-controller");
const couponsRoutes = (0, express_1.Router)();
exports.couponsRoutes = couponsRoutes;
const couponsController = new coupons_controller_1.CouponsController();
couponsRoutes.patch("/:market_id", couponsController.update);
//# sourceMappingURL=coupons-route.js.map