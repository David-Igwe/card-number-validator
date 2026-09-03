import { luhn } from "../utils/luhn";
import { ServerError } from "../utils/ServerError";

//This service is to check if the card is actually valid or not.
export const validateCardNumber = (cardNumber: string) => {
  if(cardNumber.length !== 16) {
    throw new ServerError("cardNumber must contain exactly 16 digits", 400);
  }

    const isValid = luhn(cardNumber);
  //Other validation checks like finding the card issuer using BIN/IIN can be added here in future updates
  
  return {isValid};
};