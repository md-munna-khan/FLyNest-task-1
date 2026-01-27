export const convertExpiresInToMs = (val: any, fallback = 1000 * 60 * 60) => {
  if (!val) return fallback;
  if (typeof val === 'number') return val;
  if (typeof val !== 'string') return fallback;


  const match = val.match(/^(\d+)\s*(s|m|h|d)?$/i);
  if (!match) return fallback;
  const n = Number(match[1]);
  const unit = (match[2] || 'ms').toLowerCase();
  switch (unit) {
    case 's':
      return n * 1000;
    case 'm':
      return n * 60 * 1000;
    case 'h':
      return n * 60 * 60 * 1000;
    case 'd':
      return n * 24 * 60 * 60 * 1000;
    default:
      return n;
  }
};
