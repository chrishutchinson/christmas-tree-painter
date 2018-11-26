const { tree } = require("../config");

const getTree = (req, res) => {
  res.json(tree);
};

module.exports = {
  getTree
};
