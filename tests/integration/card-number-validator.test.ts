import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../src/app";

describe("Card number validation API", () => {
  describe("POST /api/cardNumber/validate", () => {
    it("should return true for a valid card number", async () => {
      const response = await request(app)
        .post("/api/cardNumber/validate")
        .send({ cardNumber: "4532015112830366" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isValid: true });
    });

    it("should return false for an invalid card number", async () => {
      const response = await request(app)
        .post("/api/cardNumber/validate")
        .send({ cardNumber: "4532015112830367" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isValid: false });
    });

    it("should cast a numeric cardNumber before validating", async () => {
      const response = await request(app)
        .post("/api/cardNumber/validate")
        .send({ cardNumber: 4532015112830366 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isValid: true });
    });

    it("should reject a numeric cardNumber of zero", async () => {
      const response = await request(app)
        .post("/api/cardNumber/validate")
        .send({ cardNumber: 0 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "cardNumber cannot be 0 or NaN",
      });
    });

    it("should reject null, which is how JSON represents NaN", async () => {
      const response = await request(app)
        .post("/api/cardNumber/validate")
        .send({ cardNumber: null });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "cardNumber must be a string" });
    });

    it("should normalize separators before validating", async () => {
      const response = await request(app)
        .post("/api/cardNumber/validate")
        .send({ cardNumber: "4532-0151/1283 0366" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isValid: true });
    });

    it("should reject a missing cardNumber", async () => {
      const response = await request(app)
        .post("/api/cardNumber/validate")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "cardNumber is required" });
    });

    it("should reject a cardNumber with the wrong length", async () => {
      const response = await request(app)
        .post("/api/cardNumber/validate")
        .send({ cardNumber: "453201511283036" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "cardNumber must contain exactly 16 digits",
      });
    });

    it("should reject a cardNumber containing invalid characters", async () => {
      const response = await request(app)
        .post("/api/cardNumber/validate")
        .send({ cardNumber: "4532_0151_1283_0366" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "cardNumber can contain only digits, spaces, dashes, or slashes",
      });
    });
  });

  it("should return 404 for an unknown route", async () => {
    const response = await request(app).get("/api/unknown");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Route GET /api/unknown not found",
    });
  });
});
