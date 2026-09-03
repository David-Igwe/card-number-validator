import { describe, expect, it, vi } from "vitest";
import { inputMiddleware } from "../../src/middleware/inputMiddleware";
import { ServerError } from "../../src/utils/ServerError";

function createRequest(cardNumber?: unknown) {
  return {
    body: cardNumber === undefined ? {} : { cardNumber },
  } as Parameters<typeof inputMiddleware>[0];
}

describe("inputMiddleware", () => {
  it("should reject a request without cardNumber", () => {
    const next = vi.fn();

    inputMiddleware(createRequest(), {} as never, next);

    expect(next).toHaveBeenCalledOnce();
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining<Partial<ServerError>>({
        message: "cardNumber is required",
        statusCode: 400,
      }),
    );
  });

  it("should reject a non-string cardNumber", () => {
    const next = vi.fn();

    inputMiddleware(createRequest(4111111111111111), {} as never, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining<Partial<ServerError>>({
        message: "cardNumber must be a string",
        statusCode: 400,
      }),
    );
  });

  it("should normalize spaces, dashes, and slashes", () => {
    const request = createRequest("  4111-1111/1111 1111 ");
    const next = vi.fn();

    inputMiddleware(request, {} as never, next);

    expect(request.body.cardNumber).toBe("4111111111111111");
    expect(next).toHaveBeenCalledWith();
  });

  it("should reject characters other than digits, spaces, dashes or slashes", () => {
    const next = vi.fn();

    inputMiddleware(createRequest("4111_1111_1111_1111"), {} as never, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining<Partial<ServerError>>({
        message:
          "cardNumber can contain only digits, spaces, dashes, or slashes",
        statusCode: 400,
      }),
    );
  });

  it("should pass a digits-only cardNumber through unchanged", () => {
    const request = createRequest("4111111111111111");
    const next = vi.fn();

    inputMiddleware(request, {} as never, next);

    expect(request.body.cardNumber).toBe("4111111111111111");
    expect(next).toHaveBeenCalledWith();
  });
});
