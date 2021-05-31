export const DAY_IN_MILLISECONDS = 86400000;
export const WEAK_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 7;
export const MONTH_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 30;

export const summarizeByOptions = [
  {
    label: 'Day',
    id: DAY_IN_MILLISECONDS,
  },
  {
    label: 'Weak',
    id: WEAK_IN_MILLISECONDS,
  },
  {
    label: 'Month',
    id: MONTH_IN_MILLISECONDS,
  },
  {
    label: 'All time',
    id: MONTH_IN_MILLISECONDS * 100,
  },
];
