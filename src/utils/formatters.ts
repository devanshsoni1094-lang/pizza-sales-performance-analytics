export const formatCurrency = (val: number, compact = false): string => {
  if (compact) {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(2)}M`;
    }
    if (val >= 1000) {
      return `$${(val / 1000).toFixed(1)}K`;
    }
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

export const formatNumber = (val: number, compact = false): string => {
  if (compact && val >= 1000) {
    return `${(val / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-US').format(Math.round(val));
};

export const formatDecimal = (val: number, decimals = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
};

export const formatPercent = (val: number, decimals = 2): string => {
  return `${val.toFixed(decimals)}%`;
};
