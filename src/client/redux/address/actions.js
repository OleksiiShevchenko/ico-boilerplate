
export const prefix = 'address';

export const GET_ADDRESS_REQUEST = `${prefix}/GET_ADDRESS_REQUEST`;
export const GET_ADDRESS_SUCCESS = `${prefix}/GET_ADDRESS_SUCCESS`;
export const GET_ADDRESS_FAILURE = `${prefix}/GET_ADDRESS_FAILURE`;

export const getAddress = () => ({
  types: [GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, GET_ADDRESS_FAILURE],
  promise: api => api.address.getAddress(),
});


export const GET_INDEX_REQUEST = `${prefix}/GET_INDEX_REQUEST`;
export const GET_INDEX_SUCCESS = `${prefix}/GET_INDEX_SUCCESS`;
export const GET_INDEX_FAILURE = `${prefix}/GET_INDEX_FAILURE`;

export const getIndex = coin => ({
  types: [GET_INDEX_REQUEST, GET_INDEX_SUCCESS, GET_INDEX_FAILURE],
  promise: api => api.address.getIndex(coin),
});


export const LIST_ADDRESSES_REQUEST = `${prefix}/LIST_ADDRESSES_REQUEST`;
export const LIST_ADDRESSES_SUCCESS = `${prefix}/LIST_ADDRESSES_SUCCESS`;
export const LIST_ADDRESSES_FAILURE = `${prefix}/LIST_ADDRESSES_FAILURE`;

export const listAddresses = coin => ({
  types: [LIST_ADDRESSES_REQUEST, LIST_ADDRESSES_SUCCESS, LIST_ADDRESSES_FAILURE],
  promise: api => api.address.listAddresses(coin),
});


export const GET_MASTER_REQUEST = `${prefix}/GET_MASTER_REQUEST`;
export const GET_MASTER_SUCCESS = `${prefix}/GET_MASTER_SUCCESS`;
export const GET_MASTER_FAILURE = `${prefix}/GET_MASTER_FAILURE`;

export const getMasterAddresses = () => ({
  types: [GET_MASTER_REQUEST, GET_MASTER_SUCCESS, GET_MASTER_FAILURE],
  promise: api => api.address.getMasterAddresses(),
});
