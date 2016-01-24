var React = require("react");
var ReactDOM = require("react-dom");
var Routes = require("./routes.jsx");

var Parse = require('parse');

Parse.initialize("zAiWzaAbU5smkAYx3wfFT84EJNs5wKWAngAN1rxO", "cENPUhklgR4j4Z7R0agcsaocs2fCRhBiJIeAHeJi");


ReactDOM.render(
  Routes,
  document.getElementById('main')
);
