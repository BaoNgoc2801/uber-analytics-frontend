export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPercentage = (num: number): string => {
  return `${num.toFixed(2)}%`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(2);
};

export const formatDistance = (distance: number): string => {
  return `${distance.toFixed(1)} km`;
};

export const formatDuration = (minutes: number): string => {
  return `${Math.round(minutes)} min`;
};
