"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_status_codes_1 = require("http-status-codes");
var index_1 = require("../controllers/index");
var t_itemRouter = (0, express_1.Router)();
t_itemRouter.get('/', function (_, res) {
    return res.status(http_status_codes_1.StatusCodes.OK).send('Welcome to SERAPHIM v1!');
});
t_itemRouter.post('/transactions', 
//authenticateToken,
index_1.t_itemController.createValidation, index_1.t_itemController.create);
t_itemRouter.get('/transactions', index_1.t_itemController.getAllValidation, index_1.t_itemController.getAll);
t_itemRouter.get('/transactions/:transaction_id', index_1.t_itemController.getByIdValidation, index_1.t_itemController.getById);
t_itemRouter.put('/transactions/:transaction_id', index_1.t_itemController.updateByIdValidation, index_1.t_itemController.updateById);
t_itemRouter.delete('/transactions/:transaction_id', index_1.t_itemController.deleteByIdValidation, index_1.t_itemController.deleteById);
exports.default = t_itemRouter;
//# sourceMappingURL=t_itemRoutes.js.map