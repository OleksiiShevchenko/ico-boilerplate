import { prefix } from './actions';

export const loading = state => state[prefix].loading;
export const address = state => state[prefix].address;
export const derivationIndex = state => state[prefix].derivationIndex;
export const addressList = state => state[prefix].addressList || [];
export const masterAddresses = state => state[prefix].masterAddresses;
