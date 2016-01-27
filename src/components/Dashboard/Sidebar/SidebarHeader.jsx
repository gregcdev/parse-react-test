var React = require('react');
var PropTypes = React.PropTypes;

var SidebarHeader = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  goTo: function() {
    this.context.router.push("/user/account")
  },

  render: function() {

    return (
      <div className="sidebar__header" onClick={this.goTo}>
        <a className="sidebar__header-icon">
          <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
        </a>
        <a className="sidebar__header-name">{this.props.account}</a>
      </div>
    );
  }

});

module.exports = SidebarHeader;
