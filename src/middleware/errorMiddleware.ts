import { Request, Response } from "express";

export function errorMiddleware(err: Error, req: Request, res: Response) {
  console.error(err);

  res.status(500).json({
    error: "Internal server error",
  });
}