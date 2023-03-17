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
exports.publisher = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const publisher = (message) => __awaiter(void 0, void 0, void 0, function* () {
    callback_api_1.default.connect("amqp://localhost", (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            channel.assertQueue("", { exclusive: true }, function (error2, q) {
                if (error2) {
                    throw error2;
                }
                console.log(" [X] Sending file to be proceeded");
                channel.sendToQueue("rpc_queue", Buffer.from(JSON.stringify(message)));
            });
        });
    });
});
exports.publisher = publisher;
