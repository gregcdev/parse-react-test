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
  'save',
  'destroy',
]);

var CurrentProduct = Reflux.createActions([
  'setWithId',
  'set',
]);

var Toast = Reflux.createActions([
  'add',
  'remove'
]);

module.exports = {
  Business,
  CurrentBusiness,
  Product,
  CurrentProduct,
  Toast
};
