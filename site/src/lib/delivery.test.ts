import { describe, expect, it } from 'vitest';
import { boxEnvelope, deliveryNetwork, gs1CheckDigit } from './delivery';

describe('synthetic delivery network', () => {
  it('compares loaded vehicle km while keeping all sixteen parcels', () => {
    const result = deliveryNetwork(0);
    expect(result.direct.legs).toHaveLength(16);
    expect(result.viaHub.legs).toHaveLength(8);
    expect(result.direct.legs.every(leg => leg.parcels === 1)).toBe(true);
    expect(result.viaHub.legs.every(leg => leg.parcels === 4)).toBe(true);
    expect(result.inbound.reduce((sum, leg) => sum + leg.parcels, 0)).toBe(16);
    expect(result.outbound.reduce((sum, leg) => sum + leg.parcels, 0)).toBe(16);
    expect(result.direct.vehicleKm).toBeCloseTo(4 * 12 + 6 * Math.sqrt(148) + 4 * Math.sqrt(160) + 2 * Math.sqrt(180), 10);
    expect(result.viaHub.vehicleKm).toBeCloseTo(4 * Math.sqrt(45) + 4 * Math.sqrt(37), 10);
    expect(result.viaHub.parcelKm).toBeCloseTo(4 * result.viaHub.vehicleKm);
    expect(result.direct.parcelKm).toBe(result.direct.vehicleKm);
  });
  it('counts each straight loaded leg once rather than multiplying by its parcels', () => {
    const result = deliveryNetwork(3);
    expect(result.inbound.find(leg => leg.from.id === 'O4')?.km).toBe(6);
    expect(result.outbound.find(leg => leg.to.id === 'D4')?.km).toBe(6);
    for (let offset = 0; offset <= 30; offset++) {
      const network = deliveryNetwork(offset);
      expect(network.direct.vehicleKm).toBe(result.direct.vehicleKm);
      expect(network.inbound.map(leg => leg.parcels)).toEqual([4, 4, 4, 4]);
      expect(network.outbound.map(leg => leg.parcels)).toEqual([4, 4, 4, 4]);
    }
  });
  it('allows the distant hub to lose its loaded-distance advantage', () => {
    const near = deliveryNetwork(0);
    const far = deliveryNetwork(30);
    expect(near.differenceKm).toBeGreaterThan(0);
    expect(far.viaHub.vehicleKm).toBeCloseTo(2 * (Math.sqrt(1125) + Math.sqrt(997) + Math.sqrt(877) + Math.sqrt(765)), 10);
    expect(far.differenceKm).toBeLessThan(0);
    for (const invalid of [-1, 31, NaN, Infinity]) expect(() => deliveryNetwork(invalid)).toThrow(RangeError);
  });
});

describe('rectangular envelope comparison', () => {
  it('converts cubic centimetres to litres and keeps envelope difference separate', () => {
    expect(boxEnvelope(20)).toMatchObject({ productCm3: 1000, productLitres: 1, boxCm3: 12000, boxLitres: 12, differenceLitres: 11 });
    expect(boxEnvelope(20).productRatio * 100).toBeCloseTo(8.333333333333);
    expect(boxEnvelope(6).boxLitres).toBe(3.6);
    expect(boxEnvelope(40).boxLitres).toBe(24);
    for (let height = 6; height <= 40; height++) {
      const result = boxEnvelope(height);
      expect(result.boxLitres - result.productLitres).toBeCloseTo(result.differenceLitres);
      expect(result.productRatio * result.boxLitres).toBeCloseTo(1);
    }
    for (const invalid of [0, 5, 41, NaN, Infinity]) expect(() => boxEnvelope(invalid)).toThrow(RangeError);
  });
});

describe('GS1 Modulo 10 arithmetic', () => {
  it('reproduces a published GS1 UK reference and the synthetic default', () => {
    expect(gs1CheckDigit('501234567000')).toMatchObject({ status: 'valid', sum: 57, checkDigit: 3, completed: '5012345670003' });
    const result = gs1CheckDigit('123456789012');
    expect(result).toMatchObject({ status: 'valid', sum: 92, checkDigit: 8, completed: '1234567890128' });
    if (result.status === 'valid') expect(result.terms.map(term => term.weight)).toEqual([1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3]);
  });
  it('uses zero when the weighted sum is already a multiple of ten', () => {
    expect(gs1CheckDigit('501234567890')).toMatchObject({ status: 'valid', sum: 90, checkDigit: 0 });
    expect(gs1CheckDigit('000000000000')).toMatchObject({ status: 'valid', payload: '000000000000', completed: '0000000000000', checkDigit: 0 });
  });
  it('makes the completed weighted sum divisible by ten across each editable position', () => {
    for (let position = 0; position < 12; position++) for (let digit = 0; digit <= 9; digit++) {
      const payload = '123456789012'.split('');
      payload[position] = String(digit);
      const result = gs1CheckDigit(payload.join(''));
      expect(result.status).toBe('valid');
      if (result.status === 'valid') {
        expect((result.sum + result.checkDigit) % 10).toBe(0);
        expect(result.terms[11].weight).toBe(3);
        expect(result.terms.reduce((sum, term) => sum + term.digit * term.weight, 0)).toBe(result.sum);
      }
    }
  });
  it('preserves leading zeros and rejects non-ASCII, whitespace and wrong lengths', () => {
    expect(gs1CheckDigit('')).toMatchObject({ status: 'empty' });
    for (const payload of ['123', '1234567890128', ' 23456789012', '12345678901 ', '12345678901\n', '123456789012\n', '12345678901a', '１２３４５６７８９０１２', '١٢٣٤٥٦٧٨٩٠١٢']) {
      expect(gs1CheckDigit(payload)).toMatchObject({ status: 'invalid' });
    }
  });
});
