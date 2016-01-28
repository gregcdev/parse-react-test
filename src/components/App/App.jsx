var React = require('react');
var PropTypes = React.PropTypes;

var Reflux = require('reflux');
var Actions = require('../../reflux/Actions.jsx').Business;

var Parse = require('parse');
var ParseReact = require('parse-react');

var Toast = require('../Toast/ToastList.jsx');

var App = React.createClass({

  mixins: [ParseReact.Mixin],

  componentWillMount: function() {
    Actions.getBusinesses();
  },

  contextTypes: {
    router: PropTypes.object
  },

  childContextTypes: {
    rootPath: PropTypes.string
  },

  getChildContext: function() {

  },

  observe: function(props, state) {
    return {
      businesses: (new Parse.Query('Business'))
      .equalTo("owner", Parse.User.current())
      .ascending('createdAt')
    };
  },

  render: function() {
    return (
      <div>
        {this.props.children}
        <Toast />
      </div>
    );
  }

});

module.exports = App;
