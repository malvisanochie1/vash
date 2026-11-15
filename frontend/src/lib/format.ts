const naira = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 });

export const formatNaira = (amount: number) => `₦${naira.format(amount)}`;

export const percentOff = (price: number, compareAt?: number) =>
  compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0;

export const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' });

export const firstName = (name?: string) => name?.split(' ')[0] ?? 'gorgeous';
