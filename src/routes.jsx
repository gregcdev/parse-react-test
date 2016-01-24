var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var BrowserHistory = ReactRouter.hashHistory;

var Base = require('./components/Base.jsx');
var Dashboard = require('./components/Dashboard/Dashboard.jsx')
var Page1 = require('./components/Page1.jsx');
var Page2 = require('./components/Page2.jsx');

var requireAuth = function(nextState, replace) {
  // if (!auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  // }
}

var Routes = (
  <Router history={BrowserHistory}>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/" component={Base} >
      <Route path="page1" component={Page1} />
      <Route path="page2" component={Page2} onEnter={requireAuth} />
    </Route>
  </Router>
);

module.exports = Routes;
