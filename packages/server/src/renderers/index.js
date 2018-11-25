module.exports = (renderer, ledCount) => (req, res, next) => {
  const { initialize, render } = require(`./${renderer}.js`);

  initialize(ledCount);

  req.ledRenderer = {
    render
  };

  next();
};
