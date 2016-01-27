var React = require('react');
var PropTypes = React.PropTypes;

var Business = React.createClass({

  contextTypes: {
    currentBusiness: PropTypes.object
  },

  render: function() {
    return (
      <div>{this.context.currentBusiness.name}</div>
    );
  }

});

module.exports = Business;
