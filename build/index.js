"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("module-alias/register");
const body_parser_1 = __importDefault(require("body-parser"));
const consola_1 = __importDefault(require("consola"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("@config/index");
const image_1 = __importDefault(require("@routes/image"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/test");
        console.log("connexion réussie avec la base de données");
    }
    catch (error) {
        console.error(error.message);
    }
}))();
const app = (0, express_1.default)();
const startApp = () => {
    app.listen(index_1.PORT, () => consola_1.default.success({
        badge: true,
        message: `Server linstening on port ${index_1.PORT}`,
    }));
};
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use("/api/images", image_1.default);
app.use(express_1.default.static("public"));
startApp();
