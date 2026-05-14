type Currency = 'USD' | 'USDC' | 'PEN';

export function formatCurrency(amount: number, currency: Currency = 'USD'): string {
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  switch (currency) {
    case 'PEN':
      return `S/ ${formatted}`;
    case 'USD':
    case 'USDC':
    default:
      return `$${formatted}`;
  }
}
