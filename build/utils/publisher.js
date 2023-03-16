var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const amqp = require("amqplib/callback_api");
const publisher = (message) => __awaiter(this, void 0, void 0, function* () {
    amqp.connect("amqp://localhost", (error0, connection) => {
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
                const correlationId = generateUid();
                console.log(" [x] Sending file to be proceeded");
                channel.sendToQueue("rpc_queue", Buffer.from(JSON.stringify(message)), {
                    correlationId: correlationId,
                    replyTo: q.queue,
                });
            });
        });
    });
});
const generateUid = () => {
    return (Math.random().toString() +
        Math.random().toString() +
        Math.random().toString());
};
module.exports = { publisher };
