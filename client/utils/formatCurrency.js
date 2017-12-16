export function formatCurrency(value, decimal) {
  const trimEnd = decimal === 0 ? -3 : decimal - 2;
  const rawCurrency = Number.parseFloat(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const currency = trimEnd ? rawCurrency.slice(0, trimEnd) : rawCurrency;
  return currency;
}
