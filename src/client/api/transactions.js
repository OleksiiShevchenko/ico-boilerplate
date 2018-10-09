import Base from './base';

export default class Transactions extends Base {

  getBalance(coin) {
    return this.apiClient.get(`balance/${coin}`);
  }

  createTx({coin, fields}) {
    return this.apiClient.post(`generateTx/${coin}`, {fields});
  }

  transfer(fields) {
    return this.apiClient.post(`transferETH`, fields);
  }

}
