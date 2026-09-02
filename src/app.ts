import express from "express";
import router from "./routes/routes";

const app = express();

app.use(express.json());

app.use("/api/cardNumber", router);


export default app;