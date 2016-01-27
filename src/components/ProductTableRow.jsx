var React = require('react');
var PropTypes = React.PropTypes;

var ProductTableRow = React.createClass({

  contextTypes: {
    router: PropTypes.object,
    rootPath: PropTypes.string
  },

  getInitialState: function() {
    return {selected: false};
  },

  select: function() {
    var selected = !this.state.selected;
    this.setState({selected: selected})
  },

  goTo: function() {
    this.context.router.push(this.context.rootPath + "products/" + this.props.data.objectId)
  },

  render: function() {

    var columns = this.props.headers.map(function(header) {
      return <td key={Date.now()+Math.random()*999}>{this.props.data[header.value]}</td>
    }.bind(this));

    return (
      <tr onClick={this.goTo}>
        <td><input type="checkbox" onChange={this.select} checked={this.state.selected}/></td>
        {columns}
      </tr>
    );
  }

});

module.exports = ProductTableRow;
