"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionByIdController = exports.updateByIdValidation = void 0;
var http_status_codes_1 = require("http-status-codes");
var yup = __importStar(require("yup"));
var middleware_1 = require("../../shared/middleware");
var updateById_1 = require("../../database/providers/transaction/updateById");
var getById_1 = require("../../database/providers/transaction/getById");
// Use uma função de validação reutilizável para manter o código limpo
exports.updateByIdValidation = (0, middleware_1.validation)(function (getSchema) { return ({
    body: getSchema(yup.object().shape({
        tra_id: yup.number().required(),
        tra_client_id: yup.number().required(),
        tra_services_id: yup.number().required(),
        tra_status: yup.string().required(),
        tra_total_value: yup.number().required(),
        tra_payment: yup.number().required(),
    })),
}); });
var updateTransactionByIdController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var traId, existingTransaction, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                traId = req.body.tra_id;
                if (!traId) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                            .send('Transaction ID is required')];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, getById_1.getTransactionById)(traId)];
            case 2:
                existingTransaction = _a.sent();
                if (!existingTransaction) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                            .json({ error: 'Transaction not found' })];
                }
                return [4 /*yield*/, (0, updateById_1.updateTransactionById)(req.body)];
            case 3:
                result = _a.sent();
                if (result instanceof Error) {
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: result.message })];
                }
                return [2 /*return*/, res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT)];
            case 4:
                error_1 = _a.sent();
                console.error('Error updating transaction:', error_1);
                return [2 /*return*/, res
                        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                        .json({ error: 'Error updating transaction' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateTransactionByIdController = updateTransactionByIdController;
//# sourceMappingURL=updateById.js.map