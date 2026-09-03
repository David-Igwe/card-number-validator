import express from "express";
import router from "./routes/routes";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(express.json());

//The main card number validation endpoint
app.use("/api/cardNumber", router);

// A catch-all middleware for endpoints we're not providing, is simply sends back a not found message with a 404 error code
app.use(notFoundMiddleware);

// The final middleware to catch any unexpected server errors with a 500 error code
app.use(errorMiddleware);

export default app;