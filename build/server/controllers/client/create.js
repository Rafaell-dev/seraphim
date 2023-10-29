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
exports.create = exports.validatePrimaryKeys = exports.validate = exports.SchemaValidation = void 0;
var yup = __importStar(require("yup"));
var middleware_1 = require("../../shared/middleware");
var http_status_codes_1 = require("http-status-codes");
var providers_1 = require("../../database/providers");
var phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
var createSchema = yup.object().shape({
    cli_type: yup.string().required().max(1),
    cli_cpf: yup.string().notRequired().min(3),
    cli_cnpj: yup.string().notRequired().min(14),
    cli_fantasia: yup.string().notRequired().min(3),
    cli_razao: yup.string().notRequired().min(3),
    cli_name: yup.string().notRequired().min(3),
    cli_email: yup.string().required().email(),
    cli_phone: yup
        .string()
        .matches(phoneRegex, 'Phone number is not valid')
        .required(),
    cli_password: yup.string().required().min(8),
    cli_zipcode: yup.string().notRequired().min(3),
    cli_ibge: yup.string().notRequired().min(3),
    cli_state: yup.string().notRequired().min(3),
    cli_city: yup.string().notRequired().min(3),
    cli_district: yup.string().notRequired().min(3),
    cli_street: yup.string().notRequired().min(3),
    cli_number: yup.string().notRequired().min(3),
    cli_country: yup.number().notRequired().min(3),
});
exports.SchemaValidation = (0, middleware_1.validation)(function (getSchema) { return ({
    body: getSchema(createSchema),
}); });
var validate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errorsResult, validationErrors;
    return __generator(this, function (_a) {
        errorsResult = {};
        validationErrors = {};
        // Validações condicionais
        if (req.body.cli_type === 'F') {
            if (!req.body.cli_cpf || !req.body.cli_name) {
                validationErrors['error'] = 'CPF and Name is required';
            }
            if (req.body.cli_cnpj || req.body.cli_fantasia || req.body.cli_razao) {
                validationErrors['error'] = 'Invalid request body';
            }
        }
        else if (req.body.cli_type === 'J') {
            if (!req.body.cli_cnpj || !req.body.cli_fantasia || !req.body.cli_razao) {
                validationErrors['error'] =
                    'CNPJ, Fantasia and Razão is required for Juridical client';
            }
            if (req.body.cli_cpf || req.body.cli_name) {
                validationErrors['error'] = 'Invalid request body';
            }
            if (!req.body.cli_type) {
                validationErrors['error'] =
                    'Invalid request body, is missing client type';
            }
        }
        // Tratamento dos erros de validação
        if (Object.keys(validationErrors).length > 0) {
            errorsResult['error'] = validationErrors;
        }
        // Limpeza e formatação dos valores de string
        Object.entries(req.body).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (typeof value === 'string') {
                req.body[key] = value.trim();
            }
        });
        if (Object.entries(errorsResult).length === 0) {
            return [2 /*return*/, next()];
        }
        else {
            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errorsResult })];
        }
        return [2 /*return*/];
    });
}); };
exports.validate = validate;
var validatePrimaryKeys = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var params, checkEmail, checkCpf, checkCnpj, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                params = {
                    filters: {
                        cli_cpf: req.body.cli_cpf,
                        cli_cnpj: req.body.cli_cnpj,
                    },
                };
                return [4 /*yield*/, providers_1.clientsProvider.getClientByEmail(req.body.cli_email)];
            case 1:
                checkEmail = _a.sent();
                if (checkEmail) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                            .json({ error: 'Email already in use' })];
                }
                if (!(req.body.cli_type === 'F')) return [3 /*break*/, 3];
                return [4 /*yield*/, providers_1.clientsProvider.getClients({
                        filters: { cli_cpf: params.filters.cli_cpf },
                    })];
            case 2:
                checkCpf = _a.sent();
                if (checkCpf.length > 0) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                            .json({ error: 'CPF already in use' })];
                }
                _a.label = 3;
            case 3:
                if (!(req.body.cli_type === 'J' && params.filters.cli_cnpj)) return [3 /*break*/, 5];
                return [4 /*yield*/, providers_1.clientsProvider.getClients(params)];
            case 4:
                checkCnpj = _a.sent();
                if (checkCnpj !== null) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                            .json({ error: 'CNPJ already in use' })];
                }
                _a.label = 5;
            case 5:
                next();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error('Error validating primary keys:', error_1);
                return [2 /*return*/, res
                        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                        .json({ error: 'Internal server error' })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.validatePrimaryKeys = validatePrimaryKeys;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, providers_1.clientsProvider.createClient(req.body)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.CREATED).send(result)];
            case 2:
                error_2 = _a.sent();
                // Lida com erros inesperados
                console.error('Error creating client:', error_2);
                return [2 /*return*/, res
                        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                        .json({ error: 'Internal server error' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
//# sourceMappingURL=create.js.map