import amqp from "amqplib/callback_api";

interface Message {
  fileId?: String;
  wsRoom?: String;
  imagePath?: String;
  path?: String;
}

const publisher = async (message: Message) => {
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
        console.log(" [X] Sending file to be proceeded");
        channel.sendToQueue("rpc_queue", Buffer.from(JSON.stringify(message)));
      });
    });
  });
};

export { publisher };
