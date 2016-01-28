var React = require('react');
var PropTypes = React.PropTypes;

var Reflux = require('reflux');
var Actions = require('../../reflux/Actions.jsx').Toast;
var Store = require('../../reflux/Store.jsx').Toast;

var Toast = require('./Toast.jsx');

var ToastList = React.createClass({

  mixins: [Reflux.listenTo(Store, "newMessages")],

  getInitialState: function() {
    return {
      messages: []
    };
  },

  newMessages: function(last, all) {
    this.setState({messages: all})
    setTimeout(function() {Actions.remove(last)}, 3000);
  },

  textChange: function(e) {
    this.setState({text: e.target.value})
  },

  add: function() {
    var value = $("#input").val();
    Actions.add({title: value});
  },

  render: function() {

    var containerStyle = {
      position: "absolute",
      left: "15px",
      bottom: "10px",
      zIndex: "100"
    }

    var input = (
      <div className="form-inline">
        <input type="text" className="form-control" id="input"/>
        <div className="btn btn-primary" onClick={this.add}>Add</div>
      </div>
    );


    var messages = this.state.messages.map(function(message, i) {
      return <Toast key={message.id} message={message} />
    }.bind(this));

    return (
      <div style={containerStyle}>
        {messages}
      </div>
    );
  }

});

module.exports = ToastList;
