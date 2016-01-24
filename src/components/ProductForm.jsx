var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var ProductForm = React.createClass({

  getInitialState: function() {
    return {
      name: '',
      description: '',
      price: 0
    };
  },

  onChangeName: function(e) {
    this.setState({name:e.target.value});
  },

  onChangeDescription: function(e) {
    this.setState({description:e.target.value});
  },

  onChangePrice: function(e) {
    this.setState({price:e.target.value});
  },

  addProduct: function() {
    var name = this.state.name;
    var description = this.state.description;
    var price = this.state.price;
    if (name === '' || description === '') {
      return;
    }
    ParseReact.Mutation.Create('Product', {
      name: name,
      description: description,
      price: Number(price)
    }).dispatch().then(function() {
      this.setState({
        name: '',
        description: '',
        price: 0
      });
    }.bind(this));  

  },

  render: function() {
    return (
      <div className="form-inline">
        <input
          className="form-control"
          type="text"
          value={this.state.name}
          onChange={this.onChangeName}
          placeholder="Product Name"/>
        <input
          className="form-control"
          type="text"
          value={this.state.description}
          onChange={this.onChangeDescription}
          placeholder="Product Description"/>
        <input
          className="form-control"
          type="number"
          step="0.01"
          value={this.state.price}
          onChange={this.onChangePrice}
          placeholder="Price"/>
        <button className="btn btn-primary" onClick={this.addProduct}>Create</button>
      </div>
    );
  }

});

module.exports = ProductForm;
