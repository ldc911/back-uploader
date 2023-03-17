import dotenv from "dotenv";
dotenv.config();
const PORT: String = process.env.PORT;
const baseURL: String = `http://localhost:${PORT}`;
export { PORT, baseURL };
