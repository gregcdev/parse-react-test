var React = require('react');
var Parse = require('parse');
var PropTypes = React.PropTypes;

var Page2 = React.createClass({

  componentDidMount: function() {
    console.log(Parse.User.current().get('email'));
  },

  render: function() {
    return (
      <div>
        <p>Page 2</p>
      </div>
    );
  }

});

module.exports = Page2;
