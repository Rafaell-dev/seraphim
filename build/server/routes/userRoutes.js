"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_status_codes_1 = require("http-status-codes");
var index_1 = require("../controllers/index");
var middleware_1 = require("../shared/middleware");
var userRouter = (0, express_1.Router)();
userRouter.get('/', function (_, res) {
    return res.status(http_status_codes_1.StatusCodes.OK).send('Welcome to SERAPHIM v1!');
});
userRouter.post('/users', 
//authenticateToken,
index_1.usersController.createValidation, index_1.usersController.createUserController);
userRouter.get('/users', index_1.usersController.getAllValidation, index_1.usersController.getAllUsersController);
userRouter.get('/users/:user_id', index_1.usersController.getByIdValidation, index_1.usersController.getByIdValidation);
userRouter.put('/users/:user_id', index_1.usersController.updateByIdValidation, index_1.usersController.updateUserByIdController);
userRouter.delete('/users', index_1.usersController.deleteByIdValidation, index_1.usersController.deleteUserByIdController);
//Auth test
userRouter.get('/recurso-protegido', middleware_1.authenticateToken, function (req, res) {
    // O middleware authenticateToken garante que o usuário está autenticado
    // Você pode acessar informações do usuário a partir de req.user aqui
    res.json({ mensagem: 'Acesso autorizado' });
});
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map