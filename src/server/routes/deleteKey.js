const { keyStorage } = require('../models');

module.exports = async function (req, res) {
  const { data } = req.body;

  try {
    const keys = await keyStorage.getKeys(data.coin);

    keys.forEach((key, i) => {
      if (key === data.key) keys.splice(i, 1);
    });

    await keyStorage.updateKeys(keys, data.coin);

    return res.end();
  } catch (e) {
    return res.end(e);
  }
};