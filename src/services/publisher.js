const amqp = require("amqplib/callback_api");

const publisher = (file) => {
  if (!file.originalname) {
    console.log("No file selected");
    process.exit(1);
  }
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
        channel.consume(
          q.queue,
          function (msg) {
            const response = JSON.parse(msg.content.toString());
            if (msg.properties.correlationId === correlationId) {
              console.log(
                " [.] It found a %s in the picture at rank %i with a %i% confidence",
                response.label,
                response.order,
                response.confidence * 100
              );
            }
          },
          { noAck: true }
        );
        channel.sendToQueue("rpc_queue", Buffer.from(JSON.stringify(file)), {
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
