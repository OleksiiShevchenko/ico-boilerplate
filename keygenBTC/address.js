const bcoin = require('bcoin');
const Address = bcoin.primitives.Address;

function addressCheck (addr) {
  return Address.fromString(addr, 'testnet');
}

console.log(addressCheck('qp09ra6tj7eg87qz2uf4j9tdlnm7vx768u2amuf8vy'));