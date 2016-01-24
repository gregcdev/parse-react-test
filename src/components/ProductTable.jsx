var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var ProductForm = require('./ProductForm.jsx')
var ProductTableRow = require('./ProductTableRow.jsx');

var ProductTable = React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function(props, state) {
    return {
      products: (new Parse.Query('Product'))
      .ascending('createdAt')
    };
  },

  render: function() {
    var createProduct = function(product, index) {
      return (
        <ProductTableRow
          key={product.objectId ? product.objectId : Date.now()+index}
          product={product} />
      );
    };
    return (
      <div>
        <ProductForm />
        <table className="table table-condensed">
          <tbody>
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Price</td>
            </tr>
            {this.data.products.map(createProduct)}
          </tbody>
        </table>
      </div>
    );
  }

});

module.exports = ProductTable;
