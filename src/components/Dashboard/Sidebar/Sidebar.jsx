var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
var NavItem = require('./SidebarNavItem.jsx');
var Header = require('./SidebarHeader.jsx');
var Dropdown = require('./SidebarDropdown.jsx')
var BusinessSelector = require('./BusinessSelector.jsx')

var Sidebar = React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function(props, state) {
    return {
      businesses: (new Parse.Query('Business'))
      .equalTo("owner", Parse.User.current())
      .ascending('createdAt')
    };
  },

  toggle: function() {
    $('body').toggleClass('expanded')
  },

  render: function() {

    var sidebarStyle = {
      position: "fixed",
      width: 300,
      top: 0,
      left: 0,
      bottom: 0,
      background: "#0c5582"
    }

    var contentStyle = {
      marginLeft: 300,
    }

    var businessSelector;
    if (this.props.businessSelector) {
      businessSelector = <Dropdown businesses={this.data.businesses} />;
    }

    var sections = this.props.sections.map(function(section, index) {
      return <NavItem
        key={index}
        path={section.path}
        name={section.name}
        icon={section.icon} />
    }.bind(this))

    return (
      <div>
        <div className="content">{this.props.children}</div>
        <div className="sidebar">
            <Header account={Parse.User.current().get('email')}/>
            {businessSelector}
            {sections}
        </div>
        <a className="sidebar__toggle" onClick={this.toggle}>
          <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
        </a>
      </div>
    );
  }

});

module.exports = Sidebar;
