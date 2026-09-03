import { Request, Response, NextFunction } from "express";
import { ServerError } from "../utils/ServerError";

// The purpose of this middleware is to ensure that the client sent a properly structured request and after confirming this, the middleware will further format/normalize the input before passing it off to the next middleware or controller for further processing.

export function inputMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { cardNumber } = req.body;

  if (cardNumber === undefined) {
    return next(new ServerError("cardNumber is required", 400));
  }

  if (typeof cardNumber !== "string") {
    return next(new ServerError("cardNumber must be a string", 400));
  }

  const normalizedCardNumber = cardNumber.trim().replace(/[\s\-\/]/g, ""); // Remove spaces, dashes, and slashes from cardNumber

  //This makes sure that after normalization, the result is a string that only contains digits
  if (!/^\d+$/.test(normalizedCardNumber)) {
    return next(
      new ServerError(
        "cardNumber can contain only digits, spaces, dashes, or slashes",
        400,
      ),
    );
  }

  req.body.cardNumber = normalizedCardNumber;

  next();
}
