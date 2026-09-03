# Card Number Validator API

## Overview

Card Number Validator is a small Express and TypeScript API that checks whether a card number is a valid 16-digit number according to the Luhn algorithm.

## Features

- Validates card numbers with the Luhn algorithm.
- Accepts card numbers as strings or numbers.
- Removes spaces, dashes, and slashes from string input.
- Returns clear errors for invalid requests.
- Includes unit and API integration tests.

## Getting Started

### Quick Use
Make a POST request to https://card-number-validator-neon.vercel.app/api/cardNumber/validate
See the API documentation below for more info

### Installation Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Running the API

For development, with automatic restart on changes:

```bash
npm run dev
```

The API runs on `http://localhost:3000` by default. Set the `PORT` environment variable to use another port.

To build and run the compiled application:

```bash
npm run build
npm start
```

## API Documentation

### Request

```http
POST https://card-number-validator-neon.vercel.app/api/cardNumber/validate
Content-Type: application/json
```

```json
{
  "cardNumber": "4532-0151/1283 0366"
}
```

The `cardNumber` value may also be a JSON number. String input may contain spaces, dashes, or slashes; these are removed before validation.

### Successful response

The API returns HTTP `200` with a boolean result:

```json
{
  "isValid": true
}
```

An invalid Luhn number is still a successful request and returns:

```json
{
  "isValid": false
}
```

### Invalid Input

Invalid input returns HTTP `400`:

```json
{
  "error": "cardNumber is required"
}
```

Examples of rejected input include missing values, non-string/non-number values, `0`, `NaN`, unsupported characters, and numbers that do not contain exactly 16 digits after normalization.

## Validation rules

1. `cardNumber` is required.
2. String input is trimmed and may contain only digits, spaces, dashes, or slashes.
3. Numeric input must not be `0` or `NaN`, and is cast to a string.
4. The final value must contain exactly 16 digits.
5. The Luhn algorithm determines the `isValid` result.

## Design decisions

- The Luhn algorithm was chosen to implement this validator because of its relative simplicity and effectiveness in determining the validity of a payment card number, as well as it being able to quickly catch typos, misplaced numbers or random inputs. Alternatives like the Verhoeff Algorithm and the Damm Algorithm exist but are significantly more complex
- Using Regex (Regular Expressions) expressions alone to implement the validator is simply too unreliable because with Regex a number like "1111 1111 1111 1111", which is not a valid number, would pass validation.
- Input validation is handled in middleware so the controller receives a consistent value.
- The Express app is separate from the server startup code, allowing integration tests to use the app without opening a real port.
- Known `ServerError` instances keep their intended status code, while unexpected errors return HTTP `500`.
- Card issuer checks are outside the scope of this project; the service currently performs length and Luhn validation.


## Error handling

- `400`: The request or card number is invalid.
- `404`: The requested route does not exist.
- `500`: An unexpected server error occurred.

Errors are returned as JSON with an `error` property.

## Testing

Run all unit and integration tests with:

```bash
npm test
```

The tests use Vitest and Supertest. Unit tests cover the middleware and Luhn algorithm; integration tests exercise the API through HTTP requests.

## Limitations

- Only 16-digit card numbers are accepted.
- The Luhn algorithm is a standard well-known validation method, which makes it somewhat predictable, you must combine it with other secure methods to guarantee system security.
- This validates number format and checksum only. It does not confirm that a card exists, is active, or belongs to a particular issuer.
- JSON numbers can lose precision for long values. Use a string to preserve every digit, especially for card numbers with leading zeroes.
- `NaN` is not a standard JSON number and cannot be sent directly in a JSON request.

## Security considerations

- Do not log or store real card numbers.
- Use HTTPS when sending card data over a network.
- Treat this project as a format validator, not a payment-card processing system.
- Do not use real card details in development or tests.
