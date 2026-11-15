import { randomBytes, randomUUID } from 'node:crypto';

export const newId = () => randomUUID();

/** Human-friendly order reference, e.g. LH-48213. */
export const newOrderRef = () => `LH-${(randomBytes(3).readUIntBE(0, 3) % 90000) + 10000}`;
