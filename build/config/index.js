"use strict";
exports.__esModule = true;
exports.baseURL = exports.PORT = void 0;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var PORT = process.env.PORT;
exports.PORT = PORT;
var baseURL = "http://localhost:".concat(PORT);
exports.baseURL = baseURL;
