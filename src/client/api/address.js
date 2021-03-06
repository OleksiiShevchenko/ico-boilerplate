import Base from './base';

export default class Address extends Base {
  getAddress() {
    return this.apiClient.get(`getAddress`);
  }

  getIndex(coin) {
    return this.apiClient.get(`getIndex/${coin}`);
  }

  listAddresses(coin) {
    return this.apiClient.get(`listAddresses/${coin}`);
  }

  getMasterAddresses() {
    return this.apiClient.get(`ethMasterAddresses`);
  }
}
