
export const prefix = 'coins';

export const SELECT = `${prefix}/SELECT`;

export const selectCoin = coin => ({
  type: SELECT,
  data: coin,
});

