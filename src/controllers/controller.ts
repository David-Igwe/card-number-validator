import type { Request, Response } from "express";
import { validateCardNumber } from "../services/validateCardService";

export const validateCard = (req: Request, res: Response) => {
  const { cardNumber } = req.body;

  const result = validateCardNumber(cardNumber);

  res.json(result);
};