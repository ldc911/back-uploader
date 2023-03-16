const amqp = require("amqplib/callback_api");

const publisher = async (message) => {
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
};
const generateUid = () => {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
};

module.exports = { publisher };
