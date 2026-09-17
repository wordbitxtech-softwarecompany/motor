export function formatPKR(amount: number): string {
  if (!amount || amount === 0) return 'Price Coming Soon';
  return `PKR ${new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

export function formatPriceWithLabel(price: number, label?: string): string {
  if (!price || price === 0 || label === 'Price Coming Soon') {
    return 'Price Coming Soon';
  }
  const formatted = formatPKR(price);
  if (label && label !== 'Price Coming Soon') {
    return `${label} ${formatted}`;
  }
  return formatted;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPriceLacs(amount: number): string {
  if (!amount || amount === 0) return 'Price Coming Soon';
  if (amount >= 10000000) {
    const crore = (amount / 10000000).toFixed(2);
    return `PKR ${crore} Crore`;
  }
  const lacs = (amount / 100000).toFixed(2);
  return `PKR ${lacs} Lacs`;
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Display label for catalog powertrains (BEV / HEV / PHEV / REEV). */
export function formatPowertrain(pt?: string | null): string {
  if (!pt) return '';
  if (pt === 'EV') return 'BEV';
  if (pt === 'Hybrid') return 'HEV';
  return pt;
}
