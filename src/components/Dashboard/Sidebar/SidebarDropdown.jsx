var React = require('react');
var PropTypes = React.PropTypes;

var SidebarDropdown = React.createClass({

  contextTypes: {
    currentBusiness: PropTypes.object,
    router: PropTypes.object
  },

  getInitialState: function() {
    return {opened: false};
  },

  toggle: function() {
    this.setState({opened: !this.state.opened})
  },

  goTo: function(handle) {
    this.setState({opened: false});
    this.context.router.push("/user/businesses/"+handle+"/dashboard");
  },

  render: function() {
    var iconStyle = {
      float: "right",
      fontSize: "12px",
      lineHeight: "24px"
    }

    var listItems = this.props.businesses.map(function(business) {
      if (business.objectId != this.context.currentBusiness.objectId) {
        return <div className="sidebar__dropdown-item selectable" key={business.objectId} onClick={this.goTo.bind(this, business.handle)}>{business.name}</div>
      }
    }.bind(this))

    var currentName = this.context.currentBusiness ? this.context.currentBusiness.name : "";

    var iconClass = this.state.opened ? "glyphicon glyphicon-triangle-top" : "glyphicon glyphicon-triangle-bottom"

    return (
      <div className="sidebar__dropdown">
      <div className="sidebar__dropdown-item" onClick={this.toggle}>
        {currentName}
        <span style={iconStyle} className={iconClass} aria-hidden="true"></span>
      </div>
      <div className="sidebar__dropdown-list" hidden={!this.state.opened}>
        {listItems}
      </div>
      </div>
    );
  }

});

module.exports = SidebarDropdown;
