"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var cors_1 = __importDefault(require("cors"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
var transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
var serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
var t_itemRoutes_1 = __importDefault(require("./routes/t_itemRoutes"));
var server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(userRoutes_1.default);
server.use(authRoutes_1.default);
server.use(clientRoutes_1.default);
server.use(transactionRoutes_1.default);
server.use(serviceRoutes_1.default);
server.use(t_itemRoutes_1.default);
exports.default = server;
//# sourceMappingURL=index.js.map