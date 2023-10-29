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
exports.getAll = exports.getAllValidation = void 0;
var yup = __importStar(require("yup"));
var middleware_1 = require("../../shared/middleware");
var http_status_codes_1 = require("http-status-codes");
var providers_1 = require("../../database/providers");
var getAllValidationSchema = yup.object().shape({
    t_item_id: yup.number().integer().positive(),
    page: yup.number().integer().positive(),
    limit: yup.number().integer().positive(),
    filter: yup.number().integer().positive(),
});
exports.getAllValidation = (0, middleware_1.validation)(function (getSchema) { return ({
    query: getSchema(getAllValidationSchema),
}); });
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, page, _c, limit, _d, filter, _e, t_item_id, validationError, result, error_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 3, , 4]);
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, _d = _a.filter, filter = _d === void 0 ? 0 : _d, _e = _a.t_item_id, t_item_id = _e === void 0 ? 0 : _e;
                return [4 /*yield*/, getAllValidationSchema.validate({
                        page: page,
                        limit: limit,
                        filter: filter,
                        t_item_id: t_item_id,
                    })];
            case 1:
                validationError = _f.sent();
                if (validationError) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                            .json({ error: 'Invalid parameters', validationError: validationError })];
                }
                return [4 /*yield*/, providers_1.t_itemProvider.getAllTransactionItems(page, limit, filter, t_item_id)];
            case 2:
                result = _f.sent();
                if (result instanceof Error) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                            .json({ error: result.message })];
                }
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send(result)];
            case 3:
                error_1 = _f.sent();
                console.error('Error getting items:', error_1);
                return [2 /*return*/, res
                        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                        .json({ error: 'Error getting items' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
//# sourceMappingURL=getAll.js.map