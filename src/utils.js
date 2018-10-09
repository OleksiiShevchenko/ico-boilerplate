import BigNumber from 'bignumber.js/bignumber.js';

export const SATOSHI_MULT = 10 ** 8;
export const coinsToSatoshi = coins => new BigNumber(coins).multipliedBy(SATOSHI_MULT);
export const satoshiToCoins = (satoshi = 0) => new BigNumber(satoshi).dividedBy(SATOSHI_MULT);


export const WEI_MULT = 10 ** 18;
export const coinsToWei = coins => new BigNumber(coins).multipliedBy(WEI_MULT);
export const weiToCoins = wei => new BigNumber(wei).dividedBy(WEI_MULT);