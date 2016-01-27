var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var SidebarNavItem = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  goTo: function() {
    this.context.router.push(this.props.path)
  },

  render: function() {
    var activeState = this.context.router.isActive(this.props.path) ? "sidebar__nav-item active" : "sidebar__nav-item";
    var iconStyle = { marginRight: "14px" };
    return (
      <div className={activeState} onClick={this.goTo}>
        <span className={"glyphicon glyphicon-" + this.props.icon} style={iconStyle} aria-hidden="true"></span>
        <span>{this.props.name}</span>
      </div>
    );
  }

});

module.exports = SidebarNavItem;
