var React = require('react');
var PropTypes = React.PropTypes;

var Reflux = require('reflux');
var Actions = require('../../reflux/Actions.jsx').CurrentBusiness;
var Store = require('../../reflux/Store.jsx');

var Parse = require('parse');
var ParseReact = require('parse-react');

var Dashboard = require('../Dashboard/Dashboard.jsx')

var AppData = React.createClass({

  mixins: [ParseReact.Mixin, Reflux.listenTo(Store.Business, 'onChange')],

  componentWillMount: function() {
    Actions.set(this.props.params.business_id);
  },

  onChange: function(event, businesses) {
    Actions.set(this.props.params.business_id);
  },

  childContextTypes: {
    currentBusiness: PropTypes.object,
    rootPath: PropTypes.string
  },
  contextTypes: {
    router: PropTypes.object
  },

  componentWillUpdate: function(nextProps, nextState, nextContext) {
    Actions.set(nextProps.params.business_id);
  },
  getChildContext: function() {
    var rootPath = this.props.route.path.split("/")
    rootPath.pop()
    rootPath.push(this.props.routeParams["business_id"])
    rootPath = "/" + rootPath.join("/") + "/"
    if (this.data.businesses.length > 0) {
      var currentBusiness;
      this.data.businesses.map(function(business) {
        if (business.handle == this.props.params.business_id) {
          currentBusiness = business
        }
      }.bind(this))
      if (currentBusiness) {
        return {currentBusiness: currentBusiness, rootPath: rootPath}
      } else {
        this.context.router.replace('/user/businesses')
      }
    }
    return {currentBusiness: {}, rootPath: rootPath};
  },
  observe: function(props, state) {
    return {
      businesses: (new Parse.Query('Business'))
      .equalTo("owner", Parse.User.current())
      .ascending('createdAt')
    };
  },

  render: function() {

    var dashboard = <Dashboard>{this.props.children}</Dashboard>
    var loading = <div/>

    return (
      <Dashboard>
        {this.props.children}
      </Dashboard>
    );
  }

});

module.exports = AppData;
