var Reflux = require('reflux');
var Actions = require('./Actions.jsx')
var Parse = require('parse');
var Router = require('react-router').hashHistory;
console.log(Router);

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
  productObject: function() {
    var P = Parse.Object.extend('Product');
    return new P();
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
  save: function(p) {
    var product = this.productObject();
    var old;
    if (p.objectId) {
      product.id = p.objectId;
      if (p.owner.id !== Parse.User.current().id) {
        return;
      }
    } else {
      product.set("owner", Parse.User.current());
      product.set("business", CurrentBusiness.currentBusiness);
    }
    product.set("name", p.name);
    product.set("description", p.description);
    product.set("price", p.price);
    product.set("frequency", p.frequency);
    product.set("options", p.options);
    product.set("images", p.images);
    if (p.index) {
      old = this.products[p.index];
      this.products[p.index] = p;
    } else {
      this.products.push(p);
    }
    product.save().then(function(product) {
      Actions.Toast.add({title: "Product Successfully Saved!", style: "success"});
      Router.push("/user/businesses/"+CurrentBusiness.currentBusiness.handle+"/products");
    }.bind(this), function(error) {
      Actions.Toast.add({title: "Error Saving Product!", style: "error"});
      this.products[p.index] = old;
      this.fireUpdate();
    }.bind(this))
  },
  destroy: function(p) {
    var product = this.productObject();
    var old = this.products[p.index];
    product.id = p.objectId;
    this.products.splice(p.index, 1);
    this.fireUpdate();
    product.destroy({
      success: function(product) {
        Actions.Toast.add({title: "Product Successfully Destroyed!", style: "success"});
        Router.push("/user/businesses/"+CurrentBusiness.currentBusiness.handle+"/products");
      }.bind(this),
      error: function(product, error) {
        Actions.Toast.add({title: "Error Destroying Product!", style: "error"});
        this.products.splice(p.index, 0, old);
        this.fireUpdate();
      }.bind(this)
    });
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
    if (Product.products.length == 0) {
      this.id = id;
      return;
    }
    var temp;
    Product.products.map(function(product, index) {
      if (product.objectId == id) {
        temp = product;
        temp.index = index;
      }
    }.bind(this))
    this.value = temp;
    this.fireUpdate();
  },
  fireUpdate: function() {
    this.trigger(this.value);
  }
});

var Toast = Reflux.createStore({
  listenables: [Actions.Toast],
  init: function() {
    this.messages = [],
    this.lastMessage = {},
    this.id = 0;
  },
  getInitialState: function() {
    return this.messages;
  },
  add: function(object) {
    object.id = this.id;
    this.id++;
    this.messages.push(object);
    this.lastMessage = object;
    this.fireUpdate();
  },
  remove: function(object) {
    var idx = this.messages.indexOf(object);
    if (idx > -1) {
      this.messages.splice(idx, 1);
      this.fireUpdate();
    }
  },
  fireUpdate: function() {
    this.trigger(this.lastMessage, this.messages);
  }
});

module.exports = {
  Business,
  CurrentBusiness,
  Product,
  CurrentProduct,
  Toast
};
