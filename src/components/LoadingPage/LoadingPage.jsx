var React = require('react');
var PropTypes = React.PropTypes;

var LoadingPage = React.createClass({

  render: function() {

    var loadingStyle = {
      position: "relative",
      width: "100%",
      height: "100%"
    }

    var imageStyle = {
      margin: 0,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }

    if (this.props.loading) {
      return (
        <div style={loadingStyle}>
          <div style={imageStyle}>
            <img src="images/loading.gif" style={{margin:"auto"}}/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  }

});

module.exports = LoadingPage;
