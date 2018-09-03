const wallet = require('../services/wallet/wallet');


module.exports = function (req, res) {
  try {

    return res.json({res: 1});
  } catch (e) {
    return res.error(e);
  }
};