"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./server/index"));
index_1.default.listen(process.env.PORT || 5050, function () {
    console.log("Server is running on port ".concat(process.env.PORT || 5050));
});
//# sourceMappingURL=index.js.map