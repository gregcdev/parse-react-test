var React = require('react');
var PropTypes = React.PropTypes;
var Parse = require('parse');
var ParseReact = require('parse-react');

var Chips = require('../Chips/Chips.jsx')

var Reflux = require('reflux');
var Actions = require('../../reflux/Actions.jsx').CurrentProduct;
var Store = require('../../reflux/Store.jsx').CurrentProduct;

var ProductForm = React.createClass({

  contextTypes: {
    router: PropTypes.object,
    rootPath: PropTypes.string,
    currentBusiness: PropTypes.object
  },

  getInitialState: function() {
    return {frequency: "once"};
  },

  mixins: [ParseReact.Mixin, Reflux.connect(Store)],

  componentWillMount: function() {
    Actions.setWithId(this.props.params.product_id);
  },

  observe: function(props, state) {
    var id = this.props.params['product_id'];
    if (!id) {
      return;
    }
    return {
      product: (new Parse.Query(Parse.Object.extend('Product')))
      .equalTo('objectId', id)
      .limit(1)
    };
  },

  onChangeName: function(e) {
    console.log(this.state.frequency)
    this.setState({name:e.target.value});
  },

  onChangeDescription: function(e) {
    this.setState({description:e.target.value});
  },

  onChangePrice: function(e) {
    this.setState({price:e.target.value});
  },

  frequencyChange: function(e) {
    console.log(e.target.value)
    this.setState({frequency: e.target.value});
  },

  save: function() {
    var name = this.state.name;
    var description = this.state.description;
    var price = this.state.price;
    var owner = Parse.User.current();
    var business = this.context.currentBusiness;
    if (name === '' || description === '') {
      return;
    }
    ParseReact.Mutation.Create('Product', {
      name: name,
      description: description,
      price: Number(price),
      owner: owner,
      business: business
    }).dispatch().then(function() {
      this.context.router.push(this.context.rootPath + "products")
    }.bind(this));

  },

  render: function() {
    return (
      <div className="panel col-sm-4">
        <div className="panel-body">
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
              placeholder="Product Name"/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              value={this.state.description}
              onChange={this.onChangeDescription}
              placeholder="Product Description"/>
          </div>
          <div className="form-group">
            <label>Price</label>
            <div className="input-group">
              <input
                className="form-control"
                type="number"
                step="0.01"
                value={this.state.price}
                onChange={this.onChangePrice}
                placeholder="Price"/>
              <div className="input-group-btn">
                <select className="btn btn-default" onChange={this.frequencyChange} value={this.state.frequency}>
                  <option value="once">One Time</option>
                  <option value="week">Per Week</option>
                  <option value="month">Per Month</option>
                  <option value="year">Per Year</option>
                </select>
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.save}>Create</button>
        </div>
        <hr />
        <Chips />
      </div>
    );
  }

});

module.exports = ProductForm;
