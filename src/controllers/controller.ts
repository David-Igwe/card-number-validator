import type { Request, Response, NextFunction } from "express";
import { validateCardNumber } from "../services/validateCardNumber";

export const validateCardController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = validateCardNumber(req.body.cardNumber);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
