"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const categories_controller_1 = require("@/controllers/categories-controller");
const categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes = categoriesRoutes;
const categoriesController = new categories_controller_1.CategoriesController();
categoriesRoutes.get("/", categoriesController.index);
//# sourceMappingURL=categories-route.js.map