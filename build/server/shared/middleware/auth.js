"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
var client_1 = require("@prisma/client");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secretKey = 'P9[V2XvJB567'; // Substitua por sua chave secreta
var prisma = new client_1.PrismaClient();
function authenticateToken(req, res, next) {
    var token = req.header('Authorization');
    if (!token) {
        return res.sendStatus(401); // Sem token, acesso não autorizado
    }
    jsonwebtoken_1.default.verify(token, secretKey, function (err, user) {
        if (err) {
            return res.sendStatus(403); // Token inválido
        }
        req = user; // Armazena as informações do usuário no objeto de requisição
        next(); // Continue com a próxima função de middleware
    });
}
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.js.map