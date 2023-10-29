"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_status_codes_1 = require("http-status-codes");
var index_1 = require("../controllers/index");
var transactionRouter = (0, express_1.Router)();
transactionRouter.get('/', function (_, res) {
    return res.status(http_status_codes_1.StatusCodes.OK).send('Welcome to SERAPHIM v1!');
});
transactionRouter.post('/transactions', 
//authenticateToken,
index_1.transactionController.createValidation, index_1.transactionController.createTransactionController);
transactionRouter.get('/transactions', index_1.transactionController.getAllValidation, index_1.transactionController.getAllTransactionsController);
transactionRouter.get('/transactions/:transaction_id', index_1.transactionController.getByIdValidation, index_1.transactionController.getTransactionByIdController);
transactionRouter.put('/transactions/:transaction_id', index_1.transactionController.updateByIdValidation, index_1.transactionController.updateTransactionByIdController);
transactionRouter.delete('/transactions', index_1.transactionController.deleteByIdValidation, index_1.transactionController.deleteTransactionByIdController);
exports.default = transactionRouter;
//# sourceMappingURL=transactionRoutes.js.map