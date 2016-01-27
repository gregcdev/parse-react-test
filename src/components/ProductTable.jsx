var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var ProductTableRow = require('./ProductTableRow.jsx');

var ProductTable = React.createClass({

  render: function() {

    var rows = this.props.data.map(function(product) {
      return (
        <ProductTableRow
          key={product.objectId ? product.objectId : Date.now() }
          data={product}
          headers={this.props.headers} />
      );
    }.bind(this));

    var headers = this.props.headers.map(function(header) {
      return (
        <th>{header.name}</th>
      );
    })


    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th><input type="checkbox"/></th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

});

module.exports = ProductTable;
