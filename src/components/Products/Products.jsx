var React = require('react');
var PropTypes = React.PropTypes;

var Reflux = require('reflux');
var Actions = require('../../reflux/Actions.jsx').Product;
var Store = require('../../reflux/Store.jsx').Product;

var Parse = require('parse')
var ParseReact = require('parse-react')

var Link = require('react-router').Link;

var Table = require('../ProductTable.jsx')

var Products = React.createClass({

  contextTypes: {
    currentBusiness: PropTypes.object,
    rootPath: PropTypes.string,
    router: PropTypes.object
  },

  mixins: [ParseReact.Mixin, Reflux.connect(Store, 'products')],

  observe: function(props, state) {
    if (!this.context.currentBusiness.objectId) {
      return;
    }
    return {
      products: (new Parse.Query('Product'))
      .equalTo("business", this.context.currentBusiness)
      .ascending('createdAt')
    };
  },

  render: function() {

    var headers = [
      {name: "Name", value: "name"},
      {name: "Description", value: "description"},
      {name: "Price", value: "price"},
    ]

    var products = this.state.products ? this.state.products : []

    return (
      <div>
        <Link to={this.context.rootPath + "products/new"} className="btn btn-success">New</Link>
        <Table data={this.state.products} headers={headers} />
      </div>
    );
  }

});

module.exports = Products;
