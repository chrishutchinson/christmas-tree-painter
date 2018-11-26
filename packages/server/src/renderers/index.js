module.exports = (renderer, ledCount, tree) => (req, res, next) => {
  const { initialize, render, refreshRate } = require(`./${renderer}.js`);

  initialize(ledCount, tree);

  req.ledRenderer = {
    render,
    refreshRate
  };

  next();
};
