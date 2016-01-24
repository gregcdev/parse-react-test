var React = require('react');
var PropTypes = React.PropTypes;

var ProductTable = require('./ProductTable.jsx');

var Page1 = React.createClass({

  render: function() {
    return (
      <div>
        <ProductTable />
      </div>
    );
  }

});

module.exports = Page1;
