const { colors } = require("../config");

const getColors = (req, res) => {
  res.json(colors);
};

module.exports = {
  getColors,
};
