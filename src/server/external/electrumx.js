const eClient = require('electrum-client');
const config = require('../config');


class ElectrumAPI {

  constructor () {
    this.ecl = null;
  }

  getNode () {
    const { electrumNodes } = config;
    return electrumNodes[Math.floor(Math.random() * electrumNodes.length)];
  }

  async connect () {
    const connection = this.getNode();
    this.ecl = new eClient(connection.port, connection.host, 'ssl');

    try {
      await this.ecl.connect();
    } catch (e) {
      await this.reconnect(connection);
    }
  }

  reconnect (connection) {
    console.info(`Failed to connect to Electrum server: ${connection.host}. Reconnecting...`);
    return this.connect();
  }

  disconnect () {
    if (this.ecl) this.ecl.close();
    this.ecl = null;
  }

  async getUtxo (scriptHash) {
    await this.connect();
    const response = await this.ecl.blockchainScripthash_listunspent(scriptHash);
    this.disconnect();
    return response;
  }

  async getTx (txHash) {
    await this.connect();
    const response = await this.ecl.blockchainTransaction_get(txHash);
    this.disconnect();
    return response;
  }

}



module.exports = new ElectrumAPI();