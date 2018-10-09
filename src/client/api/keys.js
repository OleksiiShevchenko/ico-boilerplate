import Base from './base';

export default class Keys extends Base {
  getKeys (coin) {
    return this.apiClient.get(`keys/${coin}`);
  }

  generateKeys (coin) {
    return this.apiClient.get(`keygen/${coin}`);
  }

  importKeys (key, coin) {
    return this.apiClient.post(`import`, { data: { key, coin } });
  }

  deleteKey (key, coin) {
    return this.apiClient.delete(`deleteKey`, { data: { key, coin } });
  }
}
