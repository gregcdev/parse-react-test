var Reflux = require('reflux');

var Business = Reflux.createActions([
  'getBusinesses',
  'createBusiness',
  'setCurrentBusiness',
]);

var CurrentBusiness = Reflux.createActions([
  'set',
]);

var Product = Reflux.createActions([
  'getProducts',
]);

var CurrentProduct = Reflux.createActions([
  'setWithId',
  'set',
]);

module.exports = {
  Business,
  CurrentBusiness,
  Product,
  CurrentProduct
};
