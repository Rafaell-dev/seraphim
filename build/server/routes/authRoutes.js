"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("../controllers/index");
var authRouter = (0, express_1.Router)();
authRouter.post('/auth', 
//authenticateToken,
index_1.authController.authPassword);
exports.default = authRouter;
//# sourceMappingURL=authRoutes.js.map