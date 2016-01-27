var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
var PropTypes = React.PropTypes;

var Link = require('react-router').Link;

var Businesses = React.createClass({

  mixins: [ParseReact.Mixin],

  observe: function(props, state) {
    return {
      businesses: (new Parse.Query('Business'))
      .equalTo("owner", Parse.User.current())
      .ascending('createdAt')
    };
  },

  render: function() {
    var businesses = this.data.businesses.map(function(business) {
      return  (
        <div key={business.objectId}>
          <Link to={"/user/businesses/" + business.handle}>
            {business.name}
          </Link>
        </div>
      );
    }.bind(this));


    return (
      <div>
        {businesses}
      </div>
    );
  }

});

module.exports = Businesses;
