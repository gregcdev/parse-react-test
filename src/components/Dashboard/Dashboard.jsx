var React = require('react');
var PropTypes = React.PropTypes;

var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var Sidebar = require('./Sidebar/Sidebar.jsx');
var HeaderBar = require('./HeaderBar.jsx')

var Dashboard = React.createClass({

  contextTypes: {
    currentBusiness: PropTypes.object,
    rootPath: PropTypes.string
  },

  mixins: [ParseReact.Mixin],

  observe: function(props, state) {
    if (!this.context.currentBusiness.objectId) {
      return;
    }
    return {
      products: (new Parse.Query('Product'))
      .equalTo("business", this.context.currentBusiness)
      .ascending('createdAt')
    };
  },

  genPath: function(path) {
    return this.context.rootPath + path
  },

  render: function() {

    var sidebarSections = [
      {name:"Dashboard", path:this.genPath("dashboard"), icon:"dashboard"},
      {name:"Products", path:this.genPath("products"), icon:"tag"},
      {name:"Options", path:this.genPath("options"), icon:"paperclip"},
      {name:"Settings", path:this.genPath("settings"), icon:"cog"},
    ]

    var current = this.context.currentBusiness.objectId;

    return (
        <Sidebar businessSelector={true} sections={sidebarSections}>
          <HeaderBar />
          {current ? this.props.children : <div />}
        </Sidebar>
    );
  }

});

module.exports = Dashboard;
