var React = require('react');
var ReactRouter = require('react-router');
var Parse = require('parse');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRedirect = ReactRouter.IndexRedirect;
var IndexRoute = ReactRouter.IndexRoute;
var BrowserHistory = ReactRouter.hashHistory;

var Dashboard = require('./components/Dashboard/Dashboard.jsx')
var Products = require('./components/Products/Products.jsx')
var ProductForm = require('./components/Products/Form.jsx')
var Options = require('./components/Options/Options.jsx')
var Settings = require('./components/Settings/Settings.jsx')
var Businesses = require('./components/Businesses/Businesses.jsx')
var Overview = require('./components/Overview/Overview.jsx');
var Business = require('./components/Businesses/Business.jsx')
var AccountSettings = require('./components/Overview/Settings/Settings.jsx')
var Page1 = require('./components/Page1.jsx');
var Page2 = require('./components/Page2.jsx');
var App = require('./components/App/App.jsx');
var AppData = require('./components/App/AppData.jsx');

var requireAuth = function(nextState, replace) {
  if (!Parse.User.current()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

var Routes = (
  <Router history={BrowserHistory}>
    <Route path="/" component={App}>
      <Route path="user" component={Overview}>
        <Route path="businesses" component={Businesses}/>
        <Route path="account" component={AccountSettings}/>
      </Route>
      <Route path="user/businesses/:business_id" component={AppData}>
        <IndexRedirect to="dashboard"/>
        <Route path="dashboard" component={Business} />
        <Route path="products">
          <IndexRoute component={Products}/>
          <Route path="new" component={ProductForm} />
          <Route path=":product_id" component={ProductForm} />
        </Route>
        <Route path="options" component={Options} />
        <Route path="settings" component={Settings} />
      </Route>
      <Route path="page1" component={Page1} />
      <Route path="page2" component={Page2} onEnter={requireAuth} />
    </Route>
  </Router>
);

module.exports = Routes;
