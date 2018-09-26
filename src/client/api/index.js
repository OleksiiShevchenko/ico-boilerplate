import config from '../config';
import ApiClient from './client';

import Address from './address';
import Keys from './keys';
const apiClient = new ApiClient(config.apiPrefix);

export default {
  keys: new Keys(apiClient),
  address: new Address(apiClient),
  client: apiClient
};
