var React = require('react');
var PropTypes = React.PropTypes;
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var Sidebar = require('../Dashboard/Sidebar/Sidebar.jsx');

var Overview = React.createClass({

  mixins: [ParseReact.Mixin],

  childContextTypes: {
    currentBusiness: React.PropTypes.object
  },
  getChildContext: function() {
    if (this.data.businesses.length > 0) {
      return {currentBusiness: this.data.businesses[0]};
    } else {
      return {currentBusiness: {}};
    }
  },
  observe: function(props, state) {
    return {
      businesses: (new Parse.Query('Business'))
      .equalTo("owner", Parse.User.current())
      .ascending('createdAt')
    };
  },

  render: function() {

    var sidebarSections = [
      {name:"Businesses", path:"/user/businesses", icon:"briefcase"},
      {name:"Account Settings", path:"/user/account", icon:"cog"},
    ]

    return (
      <Sidebar sections={sidebarSections}>
        {this.props.children}
      </Sidebar>
    );
  }

});

module.exports = Overview;
