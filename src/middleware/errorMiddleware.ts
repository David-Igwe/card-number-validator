import { NextFunction, Request, Response } from "express";
import { ServerError } from "../utils/ServerError";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  //For known errors return their custom error codes and messages
  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Default for unknown errors
  return res.status(500).json({ error: "Internal server error" });
}
