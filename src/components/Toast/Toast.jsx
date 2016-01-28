var React = require('react');
var PropTypes = React.PropTypes;

var TransitionMotion = require('react-motion').TransitionMotion;

var Toast = React.createClass({

  render: function() {

    var message = this.props.message
    var color;

    switch (message.style) {
      case "success":
        color = "#4CAF50";
        break;
      case "error":
        color = "#F44336"
        break;
      case "danger":
        color = "#FF9800"
        break;
      default:
        color = "black";

    }

    var toastStyle = {
      width: "270px",
      minHeight: "50px",
      background: color,
      opacity: "0.85",
      color: "#fff",
      padding: "10px 14px",
      lineHeight: "30px",
      fontSize: "16px",
      borderRadius: "4px",
      marginBottom: "5px",
      cursor: "pointer"
    }

    return (
      <div style={toastStyle}>{message.title}</div>
    );
  }

});

module.exports = Toast;
