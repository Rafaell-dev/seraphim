"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_status_codes_1 = require("http-status-codes");
var index_1 = require("../controllers/index");
var serviceRouter = (0, express_1.Router)();
serviceRouter.get('/', function (_, res) {
    return res.status(http_status_codes_1.StatusCodes.OK).send('Welcome to SERAPHIM v1!');
});
serviceRouter.post('/transactions', 
//authenticateToken,
index_1.serviceController.createValidation, index_1.serviceController.create);
serviceRouter.get('/transactions', index_1.serviceController.getAllValidation, index_1.serviceController.getAll);
serviceRouter.get('/transactions/:transaction_id', index_1.serviceController.getByIdValidation, index_1.serviceController.getById);
serviceRouter.put('/transactions/:transaction_id', index_1.serviceController.updateByIdValidation, index_1.serviceController.updateById);
serviceRouter.delete('/transactions/:transaction_id', index_1.serviceController.deleteByIdValidation, index_1.serviceController.deleteById);
exports.default = serviceRouter;
//# sourceMappingURL=serviceRoutes.js.map