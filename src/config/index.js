const dotenv = require("dotenv");

const { parsed } = dotenv.config();
const PORT = process.env.PORT || parsed.PORT;
const baseURL = `http://localhost:${PORT}`;
module.exports = { PORT, baseURL };
