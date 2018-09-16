const eClient = require('electrum-client');
const config = require('../config');


class ElectrumAPI {

  getNode () {
    const { electrumNodes } = config;
    return electrumNodes[Math.floor(Math.random() * electrumNodes.length)];
  }

  async connect () {
    const connection = this.getNode();
    const ecl = new eClient(connection.port, connection.host, 'ssl');

    try {
      await ecl.connect();
      return ecl;
    } catch (e) {
      await this.reconnect(connection);
    }
  }

  reconnect (connection) {
    console.info(`Failed to connect to Electrum server: ${connection.host}. Reconnecting...`);
    return this.connect();
  }

  disconnect (ecl) {
    if (ecl) ecl.close();
  }

  async getUtxo (scriptHash) {
    return this.execute(ecl => ecl.blockchainScripthash_listunspent(scriptHash));
  }

  async getTx (txHash) {
    return this.execute(ecl => ecl.blockchainTransaction_get(txHash));
  }

  async execute (fn) {
    const ecl = await this.connect();
    const response = await fn(ecl);
    await this.disconnect(ecl);
    return response;
  }

}



module.exports = new ElectrumAPI();