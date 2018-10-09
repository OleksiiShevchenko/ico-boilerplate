import config from '../config';
import ApiClient from './client';

import Address from './address';
import Keys from './keys';
import Transactions from './transactions';
const apiClient = new ApiClient(config.apiPrefix);

export default {
  keys: new Keys(apiClient),
  address: new Address(apiClient),
  transactions: new Transactions(apiClient),
  client: apiClient
};
