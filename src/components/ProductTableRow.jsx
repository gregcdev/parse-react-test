var React = require('react');

var ProductTableRow = React.createClass({

  render: function() {
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.description}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }

});

module.exports = ProductTableRow;
