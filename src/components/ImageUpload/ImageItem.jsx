var React = require('react');
var PropTypes = React.PropTypes;

var ImageItem = React.createClass({

  render: function() {
    
    if (this.props.upload) {
      return (
        <div className="imageUpload__image">
          <label htmlFor="file-input">
            <span className="glyphicon glyphicon-plus imageUpload__input-icon"></span>
          </label>
          <input
            id="file-input"
            type="file"
            onChange={this.props.onChange}
            accept="image/*"
            multiple />
        </div>
      );
    } else {
      return (
        <div className="imageUpload__image" onClick={this.props.onClick}>
          <img src={this.props.src.url ? this.props.src.url() : this.props.src} />
          <div className="imageUpload__image-overlay">
            <span className="glyphicon glyphicon-remove imageUpload__input-icon" style={{color: "red"}}></span>
          </div>
        </div>
      );
    }
  }

});

module.exports = ImageItem;
