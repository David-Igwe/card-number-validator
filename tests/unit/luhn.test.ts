import { describe, expect, it } from 'vitest';
import { luhn } from '../../src/utils/luhn';

describe('Luhn Algorithm', () => {
  describe('valid card numbers', () => {
    it('should return true for a valid card number', () => {
      expect(luhn('4532015112830366')).toBe(true);
    });

    it('should return true for another valid card number', () => {
      expect(luhn('6011111111111117')).toBe(true);
    });
  });

  describe('invalid card numbers', () => {
    it('should return false for an invalid card number', () => {
      expect(luhn('4532015112830367')).toBe(false);
    });

    it('should return false when a digit is changed in a valid number', () => {
      expect(luhn('6011111111111118')).toBe(false);
    });
  });
});