const amqp = require("amqplib/callback_api");
const axios = require("axios");
var FormData = require("form-data");
const fs = require("fs");

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    const queue = "rpc_queue";

    channel.assertQueue(queue, { durable: false });

    channel.prefetch(1);

    console.log(" [x] Awaiting RPC requests");

    channel.consume(queue, function reply(msg) {
      const encodedImage = msg.content.toString();
      const decodedImage = JSON.parse(encodedImage);
      const formData = new FormData();
      formData.append("", fs.createReadStream(decodedImage.path));

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:32168/v1/vision/detection",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: formData,
      };

      const describeImage = async () => {
        const response = await axios(config);
        const { data } = response;
        data.predictions[0].order = decodedImage.order;
        const resp = JSON.stringify(data.predictions[0]);
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(resp), {
          correlationId: msg.properties.correlationId,
        });
      };
      describeImage();
      channel.ack(msg);
    });
  });
});
