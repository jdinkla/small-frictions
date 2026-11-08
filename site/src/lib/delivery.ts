/** Synthetic explanatory examples. Distances are Euclidean kilometres, not road routes. */
export interface Point { id: string; x: number; y: number; }
export interface LoadedLeg { from: Point; to: Point; parcels: number; km: number; }
export const DELIVERY_DEFAULTS = { hubOffset: 0, boxHeight: 20, payload: '123456789012' } as const;
export const ORIGINS: readonly Point[] = [-3, -1, 1, 3].map((y, i) => ({ id: `O${i + 1}`, x: 0, y }));
export const DESTINATIONS: readonly Point[] = [-3, -1, 1, 3].map((y, i) => ({ id: `D${i + 1}`, x: 12, y }));
const leg = (from: Point, to: Point, parcels: number): LoadedLeg => ({ from, to, parcels, km: Math.hypot(to.x - from.x, to.y - from.y) });
const totals = (legs: LoadedLeg[]) => ({
  legs,
  vehicleKm: legs.reduce((sum, item) => sum + item.km, 0),
  parcelKm: legs.reduce((sum, item) => sum + item.km * item.parcels, 0),
});

/** Each origin sends one parcel to each destination: 16 parcels in either comparison. */
export function deliveryNetwork(hubOffset: number) {
  if (!Number.isFinite(hubOffset) || hubOffset < 0 || hubOffset > 30) throw new RangeError('Hub offset must be between 0 and 30 km.');
  const hub: Point = { id: 'H', x: 6, y: hubOffset };
  const direct = totals(ORIGINS.flatMap(origin => DESTINATIONS.map(destination => leg(origin, destination, 1))));
  const inbound = ORIGINS.map(origin => leg(origin, hub, DESTINATIONS.length));
  const outbound = DESTINATIONS.map(destination => leg(hub, destination, ORIGINS.length));
  const viaHub = totals([...inbound, ...outbound]);
  return { hub, origins: ORIGINS, destinations: DESTINATIONS, parcels: 16, capacityRequired: 4, direct, viaHub, inbound, outbound, differenceKm: direct.vehicleKm - viaHub.vehicleKm };
}

/** External box envelope versus product envelope; 1 litre = 1,000 cubic centimetres. */
export function boxEnvelope(heightCm: number) {
  if (!Number.isFinite(heightCm) || heightCm < 6 || heightCm > 40) throw new RangeError('Box height must be between 6 and 40 cm.');
  const productCm3 = 20 * 10 * 5;
  const boxCm3 = 30 * 20 * heightCm;
  return { heightCm, productCm3, boxCm3, productLitres: productCm3 / 1000, boxLitres: boxCm3 / 1000, differenceLitres: (boxCm3 - productCm3) / 1000, productRatio: productCm3 / boxCm3 };
}

export interface WeightedDigit { position: number; digit: number; weight: number; product: number; }
export type CheckDigitResult =
  | { status: 'empty' | 'invalid'; message: string }
  | { status: 'valid'; payload: string; terms: WeightedDigit[]; sum: number; checkDigit: number; completed: string };

/** GS1 Modulo 10 arithmetic only. Never trims, coerces, allocates or authenticates identifiers. */
export function gs1CheckDigit(payload: string): CheckDigitResult {
  if (payload === '') return { status: 'empty', message: 'Enter 12 digits to inspect the calculation.' };
  if (payload.length !== 12 || !/^[0-9]{12}$/.test(payload)) return { status: 'invalid', message: 'Use exactly 12 digits, 0–9, without spaces or a check digit.' };
  const terms = [...payload].map((value, index) => {
    const digit = Number(value);
    const weight = (payload.length - 1 - index) % 2 === 0 ? 3 : 1;
    return { position: index + 1, digit, weight, product: digit * weight };
  });
  const sum = terms.reduce((total, term) => total + term.product, 0);
  const checkDigit = (10 - sum % 10) % 10;
  return { status: 'valid', payload, terms, sum, checkDigit, completed: `${payload}${checkDigit}` };
}
