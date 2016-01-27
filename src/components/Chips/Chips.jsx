var React = require('react');
var PropTypes = React.PropTypes;

var Chips = React.createClass({

  getInitialState: function() {
    return {
      chips: [],
      value: ""
    };
  },

  removeChip: function(chip) {
    var chips = this.state.chips;
    var idx = chips.indexOf(chip);
    chips.splice(idx, 1)
    this.setState({chips: chips});
  },

  addChip: function(item) {
    var chips = this.state.chips;
    if (item.trim() !== "") {
      chips.push(item.trim());
    }
    this.setState({chips: chips, value: ""});
  },

  onFocus: function() {
    $('.chips__input').focus();
    $('.chips__container').addClass('focused');
  },

  onBlur: function() {
    $('.chips__container').removeClass('focused');
  },

  onChange: function(e) {
    var value = e.target.value;
    var array = e.target.value.split(",");
    if (array.length > 1) {
      array.map(function(item) {
        if (item !== "") {
          this.addChip(item);
        }
      }.bind(this));
      return;
    } else {
      this.setState({value: value});
    }
  },

  onKeyPress: function(e) {
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      this.addChip(this.state.value);
      return;
    }
    if (e.keyCode === 8 && this.state.value === "") {
      if ($('.chips__chip').last().hasClass('selected')) {
        var chips = this.state.chips;
        chips.pop();
        this.setState({chips: chips})
      } else {
        $('.chips__chip').last().addClass('selected');
      }
    }
  },

  render: function() {

    var chips = this.state.chips.map(function(chip) {
      return (
        <div key={Date.now() + Math.random() * 99} className="chips__chip">
          {chip}
          <span className="chips__chip-close glyphicon glyphicon-remove" onClick={this.removeChip.bind(this, chip)}></span>
        </div>
      );
    }.bind(this));

    return (
      <div className="chips__container" onClick={this.onFocus}>
        {chips}
        <input
          type="text"
          className="chips__input fluid"
          value={this.state.value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onKeyDown={this.onKeyPress}/>
      </div>
    );
  }

});

module.exports = Chips;
