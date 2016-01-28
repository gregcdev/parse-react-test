var React = require('react');
var PropTypes = React.PropTypes;
var Parse = require('parse');
var ParseReact = require('parse-react');

var Chips = require('../Chips/Chips.jsx');
var ImageUpload = require('../ImageUpload/ImageUpload.jsx');

var Reflux = require('reflux');
var Actions = require('../../reflux/Actions.jsx');
var Store = require('../../reflux/Store.jsx').CurrentProduct;

var ProductForm = React.createClass({

  contextTypes: {
    router: PropTypes.object,
    rootPath: PropTypes.string,
    currentBusiness: PropTypes.object
  },

  getInitialState: function() {
    return {
      frequency: "once",
      images: [],
      options: []
     };
  },

  mixins: [Reflux.ListenerMixin],

  componentWillMount: function() {
    if (this.props.params.product_id) {
      this.listenTo(Store, this.gotProduct);
      Actions.CurrentProduct.setWithId(this.props.params.product_id);
      this.setState({loading: true});
    }
  },

  componentWillUpdate: function(p, s, c) {
    if (p.params.product_id !== this.state.objectId) {
      Actions.CurrentProduct.setWithId(p.params.product_id);
    }
  },

  gotProduct: function(product) {
    if (!product) {
      this.context.router.replace(this.context.rootPath + "products")
      return;
    }
    this.setState(product);
    this.setState({loading: false});
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
    this.setState({frequency: e.target.value});
  },

  save: function() {
    Actions.Product.save(this.state);
  },

  destroy: function() {
    Actions.Product.destroy(this.state);
  },

  render: function() {

    return (
      <div className="panel col-sm-4">
        <div className="panel-body">
          <div className="form-group">
            <label>Name</label>
            <input
              disabled={this.state.loading}
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
              placeholder="Product Name"/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              disabled={this.state.loading}
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
                disabled={this.state.loading}
                className="form-control"
                type="number"
                step="0.01"
                value={this.state.price}
                onChange={this.onChangePrice}
                placeholder="Price"/>
              <div className="input-group-btn">
                <select className="btn btn-default"
                  onChange={this.frequencyChange}
                  value={this.state.frequency}
                  defaultValue="once"
                  disabled={this.state.loading}>
                  <option value="once">One Time</option>
                  <option value="week">Per Week</option>
                  <option value="month">Per Month</option>
                  <option value="year">Per Year</option>
                </select>
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.save} disabled={this.state.loading}>Save</button>
        </div>
        <hr />
        <Chips />
        <ImageUpload images={this.state.images}/>
        <hr />
        <div className="btn btn-danger" onClick={this.destroy} disabled={this.state.loading}>Destroy</div>
      </div>
    );
  }

});

module.exports = ProductForm;
