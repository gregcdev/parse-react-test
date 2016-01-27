var Reflux = require('reflux');
var Actions = require('./Actions.jsx')
var Parse = require('parse');
var Router = require('react-router').hashHistory;

var Business = Reflux.createStore({
  listenables: [Actions.Business],
  init: function() {
    this.businesses = [];
  },
  getInitialState: function() {
    return [];
  },
  getBusinesses: function() {
    if (Parse.User.current()) {
      var B = Parse.Object.extend('Business');
      var query = new Parse.Query(B);
      query.equalTo('owner', Parse.User.current);
      query.find().then(function(results) {
        this.businesses = results.map(function(result) {
          var temp = $.extend({}, result.attributes);
          temp.objectId = result.id;
          temp.className = result.className;
          return temp;
        });
        this.fireUpdate();
      }.bind(this));
    }
  },
  setCurrentBusiness: function(handle) {
    if (this.currentBusiness) {
      if (this.currentBusiness.handle === handle) {
        return;
      }
    }
    if (this.businesses) {
      this.businesses.map(function(business) {
        if (business.handle == handle) {
          this.currentBusiness = business;
          Product.getProducts();
          this.fireUpdate();
        }
      }.bind(this));
    }
  },
  fireUpdate: function() {
    this.trigger('change', this.businesses, this.currentBusiness);
  }

});

var CurrentBusiness = Reflux.createStore({
  listenables: [Actions.CurrentBusiness],
  init: function() {
    this.currentBusiness = {};
  },
  set: function(handle) {
    if (this.currentBusiness.handle === handle) {
      return;
    }
    Business.businesses.map(function(business) {
      if (business.handle == handle) {
        this.currentBusiness = business;
        this.fireUpdate();
      }
    }.bind(this))
  },
  fireUpdate: function() {
    this.trigger(this.CurrentBusiness)
  }
});

var Product = Reflux.createStore({
  listenables: [Actions.Product],
  init: function() {
    this.listenTo(CurrentBusiness, this.getProducts);
    this.products = [];
  },
  getInitialState: function() {
        return this.products ? this.products : [];
  },
  getProducts: function() {

    if (CurrentBusiness.currentBusiness && Parse.User.current) {
      var P = Parse.Object.extend('Product');
      var query = new Parse.Query(P);
      var B = Parse.Object.extend('Business');
      business = new B();
      business.id = CurrentBusiness.currentBusiness.objectId;
      query.equalTo('business', business);
      query.find().then(function(results) {
        this.products = results.map(function(result) {
          var temp = $.extend({}, result.attributes);
          temp.objectId = result.id;
          temp.className = result.className;
          return temp;
        });
        this.fireUpdate();
      }.bind(this));
    }
  },
  fireUpdate: function() {
    this.trigger(this.products);
  }
});

var CurrentProduct = Reflux.createStore({
  listenables: [Actions.CurrentProduct],
  init: function() {
    this.value = {};
    this.listenTo(Product, this.setOnLoad);
  },
  getInitialState: function() {
    return this.value;
  },
  set: function(product) {
    if (product == this.value) {
      return;
    }
    this.value = product;
    this.fireUpdate();
  },
  setOnLoad: function() {
    if (this.id && !this.value.objectId) {
      this.setWithId(this.id);
    }
  },
  setWithId: function(id) {
    if (id == this.value.objectId) {
      return
    };
    if (Product.products.length == 0) {
      this.id = id;
      return;
    }
    var temp;
    Product.products.map(function(product) {
      if (product.objectId == id) {
        temp = product;
      }
    }.bind(this))
    this.value = temp;
    this.fireUpdate();
  },
  fireUpdate: function() {
    this.trigger(this.value);
  }
});
module.exports = {
  Business,
  CurrentBusiness,
  Product,
  CurrentProduct
};
