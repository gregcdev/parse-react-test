var React = require('react');
var PropTypes = React.PropTypes;

var ImageItem = require('./ImageItem.jsx')

var ImageUpload = React.createClass({

  getInitialState: function() {
    return {
      images: this.props.images
    };
  },

  componentWillUpdate: function(p, s, c) {
    if (this.state.images.length === 0 && p.images.length !== 0) {
      this.setState({images: p.images})
      return false;
    } else {
      return true;
    }
  },

  onChange: function(e) {
    var files = e.target.files;
    var reader = new FileReader();
    var i = 0;
    reader.onload = function() {
      var images = this.state.images;
      images.push(reader.result);
      this.setState({images: images});
      i++;
      if (files[i]) {
        reader.readAsDataURL(files[i])
      }
    }.bind(this);
    reader.readAsDataURL(files[0])
  },

  removeImage: function(src) {
    var images = this.state.images;
    var idx = images.indexOf(src);
    if (idx > -1) {
      images.splice(idx, 1);
      this.setState({images, images});
    }
  },

  render: function() {

    var images = this.state.images.map(function(image) {
      return (
        <ImageItem
          key={Date.now() + Math.random() * 99}
          onClick={this.removeImage.bind(this, image)}
          src={image}/>
      );
    }.bind(this))

    return (
      <div className="imageUpload__container">
        {images}
        <ImageItem upload={true} onChange={this.onChange} />
      </div>
    );
  }

});

module.exports = ImageUpload;
