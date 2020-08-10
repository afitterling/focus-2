import React, { Component } from 'react'

export default class RatingExampleControlled extends Component {
  state = { rating: this.props.value }

  handleChange = (e) => {
    this.setState({ rating: e.target.value });
    this.props.onChange(e.target.value);
  }

  render() {
    const { rating } = this.state

    return (
      <div className="ui">
        <div>{this.props.name}: </div>
        <input
          style={{width: '100%'}}
          type='range'
          min={0}
          max={12}
          value={rating}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
