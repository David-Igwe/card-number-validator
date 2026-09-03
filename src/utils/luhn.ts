export const luhn = (cardNumber: string): boolean => {
  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = Number(cardNumber[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        // this is the same as adding the digits of the doubled value, which is the actual step in the algorithm
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  //if the sum is a multiple of 10 it returns true else it returns false
  return sum % 10 === 0;
};
