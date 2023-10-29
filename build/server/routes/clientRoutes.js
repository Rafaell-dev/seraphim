"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_status_codes_1 = require("http-status-codes");
var index_1 = require("../controllers/index");
var middleware_1 = require("../shared/middleware");
var clientRouter = (0, express_1.Router)();
clientRouter.get('/', function (_, res) {
    return res.status(http_status_codes_1.StatusCodes.OK).send('Welcome to SERAPHIM v1!');
});
clientRouter.post('/clients', 
//authenticateToken,
index_1.clientsController.SchemaValidation, index_1.clientsController.validatePrimaryKeys, index_1.clientsController.validate, index_1.clientsController.create);
clientRouter.get('/clients', index_1.clientsController.getAllValidation, index_1.clientsController.getAll);
clientRouter.get('/clients/:client_id', index_1.clientsController.getByIdValidation, index_1.clientsController.getById);
clientRouter.get('/clients/:client_id_doc', index_1.clientsController.getByIdDocValidation, index_1.clientsController.getByIdDoc);
clientRouter.put('/clients', index_1.clientsController.updateByIdValidation, index_1.clientsController.updateById);
clientRouter.delete('/clients/:client_id', index_1.clientsController.deleteByIdValidation, index_1.clientsController.deleteById);
//Auth test
clientRouter.get('/recurso-protegido', middleware_1.authenticateToken, function (req, res) {
    // O middleware authenticateToken garante que o usuário está autenticado
    // Você pode acessar informações do usuário a partir de req.client aqui
    res.json({ mensagem: 'Acesso autorizado' });
});
exports.default = clientRouter;
//# sourceMappingURL=clientRoutes.js.map